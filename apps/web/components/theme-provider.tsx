"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type Props = React.PropsWithChildren<Record<string, unknown>>

export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...(props as any)}>{children}</NextThemesProvider>
}
