"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/common/Modal";
import { useAppStore } from "@/stores/appStore";
import type { Repository } from "@/types";

interface RepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  editRepo?: Repository | null;
}

export function RepoModal({ isOpen, onClose, editRepo }: RepoModalProps) {
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const { addRepo, updateRepo } = useAppStore();

  const isEditMode = !!editRepo;

  // Populate form when editing
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (editRepo) {
      setName(editRepo.name);
      setTag(editRepo.tag);
    } else {
      setName("");
      setTag("");
    }
  }, [editRepo, isOpen]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (isEditMode && editRepo) {
      updateRepo(editRepo.id, { name: name.trim(), tag: tag.trim() });
    } else {
      addRepo({ name: name.trim(), tag: tag.trim() });
    }

    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Repository" : "New Repository"}
      footer={
        <>
          <button
            onClick={onClose}
            className="h-[34px] rounded-lg border border-(--border) bg-(--btn) px-3 text-[13px] font-semibold text-(--text) hover:bg-(--btn-hover)"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="h-[34px] rounded-lg border border-[rgba(46,160,67,0.45)] bg-(--accent) px-3 text-[13px] font-semibold text-white hover:bg-(--accent-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEditMode ? "Save" : "Create"}
          </button>
        </>
      }
    >
      {/* Name */}
      <label className="flex flex-col gap-1.5 text-xs text-(--muted)">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Career / Projects"
          autoFocus
          className="h-10 rounded-[10px] border border-(--border) bg-(--panel2) px-2.5 text-[13px] text-(--text) outline-none placeholder:text-(--muted)"
        />
      </label>

      {/* Tag */}
      <label className="flex flex-col gap-1.5 text-xs text-(--muted)">
        Tag (optional)
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="resume · impact"
          className="h-10 rounded-[10px] border border-(--border) bg-(--panel2) px-2.5 text-[13px] text-(--text) outline-none placeholder:text-(--muted)"
        />
      </label>
    </Modal>
  );
}
