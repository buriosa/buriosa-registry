#!/usr/bin/env tsx

import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";
import { ZodError } from "zod";
import {
  ComponentMetadataSchema,
  PageMetadataSchema,
} from "../src/types/metadata";

// ============================================================================
// Colors for terminal output
// ============================================================================

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

// ============================================================================
// Validation Result Types
// ============================================================================

interface ValidationResult {
  componentName: string;
  filePath: string;
  valid: boolean;
  errors: string[];
}

// ============================================================================
// Validation Functions
// ============================================================================

function validateMetadataFile(
  componentName: string,
  metadataPath: string
): ValidationResult {
  const result: ValidationResult = {
    componentName,
    filePath: metadataPath,
    valid: false,
    errors: [],
  };

  try {
    // Read and parse YAML
    const content = fs.readFileSync(metadataPath, "utf-8");
    const data = yaml.load(content);

    if (!data || typeof data !== "object") {
      result.errors.push("Invalid YAML format: file is empty or not an object");
      return result;
    }

    // Determine if it's a page or component based on category
    const isPage = (data as any).category === "page";

    // Validate with appropriate schema
    try {
      if (isPage) {
        PageMetadataSchema.parse(data);
      } else {
        ComponentMetadataSchema.parse(data);
      }
      result.valid = true;
    } catch (error) {
      if (error instanceof ZodError) {
        result.errors = error.errors.map((err) => {
          const path = err.path.join(".");
          return `  ${colors.yellow}${path}${colors.reset}: ${err.message}`;
        });
      } else {
        result.errors.push(`Unknown validation error: ${error}`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      result.errors.push(`Failed to read/parse file: ${error.message}`);
    } else {
      result.errors.push(`Unknown error: ${error}`);
    }
  }

  return result;
}

function findAllMetadataFiles(registryDir: string): Map<string, string> {
  const metadataFiles = new Map<string, string>();

  if (!fs.existsSync(registryDir)) {
    console.error(
      `${colors.red}✗${colors.reset} Registry directory not found: ${registryDir}`
    );
    return metadataFiles;
  }

  const componentDirs = fs
    .readdirSync(registryDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const name of componentDirs) {
    const metadataPath = path.join(registryDir, name, "metadata.yaml");
    if (fs.existsSync(metadataPath)) {
      metadataFiles.set(name, metadataPath);
    }
  }

  return metadataFiles;
}

// ============================================================================
// Main Function
// ============================================================================

async function main() {
  console.log(
    `${colors.bright}${colors.blue}🔍 Validating Component Metadata${colors.reset}\n`
  );

  const registryDir = path.join(process.cwd(), "src/components/registry");
  const metadataFiles = findAllMetadataFiles(registryDir);

  if (metadataFiles.size === 0) {
    console.log(
      `${colors.yellow}⚠${colors.reset} No metadata.yaml files found in ${registryDir}\n`
    );
    process.exit(0);
  }

  console.log(
    `Found ${colors.cyan}${metadataFiles.size}${colors.reset} metadata file(s)\n`
  );

  // Validate all files
  const results: ValidationResult[] = [];
  for (const [name, filePath] of metadataFiles) {
    results.push(validateMetadataFile(name, filePath));
  }

  // Print results
  const validFiles = results.filter((r) => r.valid);
  const invalidFiles = results.filter((r) => !r.valid);

  // Print invalid files first
  if (invalidFiles.length > 0) {
    console.log(`${colors.red}${colors.bright}Failed Files:${colors.reset}\n`);

    for (const result of invalidFiles) {
      console.log(
        `${colors.red}✗${colors.reset} ${colors.bright}${result.componentName}${colors.reset}`
      );
      console.log(`  ${colors.cyan}${result.filePath}${colors.reset}`);
      for (const error of result.errors) {
        console.log(error);
      }
      console.log();
    }
  }

  // Print valid files
  if (validFiles.length > 0) {
    console.log(`${colors.green}${colors.bright}Valid Files:${colors.reset}\n`);

    for (const result of validFiles) {
      console.log(
        `${colors.green}✓${colors.reset} ${result.componentName} ${colors.cyan}(${result.filePath})${colors.reset}`
      );
    }
    console.log();
  }

  // Summary
  console.log(`${colors.bright}Summary:${colors.reset}`);
  console.log(
    `  ${colors.green}✓ Valid:${colors.reset}   ${validFiles.length}/${results.length}`
  );
  console.log(
    `  ${colors.red}✗ Invalid:${colors.reset} ${invalidFiles.length}/${results.length}`
  );

  if (invalidFiles.length > 0) {
    console.log(
      `\n${colors.red}${colors.bright}Validation failed!${colors.reset}`
    );
    process.exit(1);
  } else {
    console.log(
      `\n${colors.green}${colors.bright}✓ All metadata files are valid!${colors.reset}`
    );
    process.exit(0);
  }
}

// ============================================================================
// Run
// ============================================================================

main().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});
