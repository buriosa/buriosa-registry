"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/common/Modal";
import { useAppStore } from "@/stores/appStore";
import type { Commit } from "@/types";

interface CommitModalProps {
  isOpen: boolean;
  onClose: () => void;
  editCommit?: Commit | null;
}

export function CommitModal({ isOpen, onClose, editCommit }: CommitModalProps) {
  const { repos, activeRepoId, addCommit, updateCommit } = useAppStore();

  const [repoId, setRepoId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);

  const isEditMode = !!editCommit;

  // Populate form
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (editCommit) {
      setRepoId(editCommit.repoId);
      const dt = new Date(editCommit.dateTime);
      setDate(dt.toISOString().split("T")[0]);
      setTime(dt.toTimeString().slice(0, 5));
      setTitle(editCommit.title);
      setBody(editCommit.body);
      setTagsInput(editCommit.tags.join(", "));
      setIsHighlighted(editCommit.isHighlighted);
    } else {
      // Default values for new commit
      const now = new Date();
      setRepoId(activeRepoId || repos[0]?.id || "");
      setDate(now.toISOString().split("T")[0]);
      setTime(now.toTimeString().slice(0, 5));
      setTitle("");
      setBody("");
      setTagsInput("");
      setIsHighlighted(false);
    }
  }, [editCommit, isOpen, activeRepoId, repos]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSubmit = () => {
    if (!repoId || !title.trim()) return;

    const selectedRepo = repos.find((r) => r.id === repoId);
    if (!selectedRepo) return;

    const dateTime = new Date(`${date}T${time}`).toISOString();
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (isEditMode && editCommit) {
      updateCommit(editCommit.id, {
        repoId,
        repoName: selectedRepo.name,
        title: title.trim(),
        body: body.trim(),
        tags,
        dateTime,
        isHighlighted,
      });
    } else {
      addCommit({
        repoId,
        repoName: selectedRepo.name,
        title: title.trim(),
        body: body.trim(),
        tags,
        dateTime,
        isHighlighted,
      });
    }

    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Commit" : "New Commit"}
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
            disabled={!repoId || !title.trim()}
            className="h-[34px] rounded-lg border border-[rgba(46,160,67,0.45)] bg-(--accent) px-3 text-[13px] font-semibold text-white hover:bg-(--accent-hover) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEditMode ? "Save" : "Commit"}
          </button>
        </>
      }
    >
      {/* Repo Select */}
      <label className="flex flex-col gap-1.5 text-xs text-(--muted)">
        Repository
        <select
          value={repoId}
          onChange={(e) => setRepoId(e.target.value)}
          className="h-10 rounded-[10px] border border-(--border) bg-(--panel2) px-2.5 text-[13px] text-(--text) outline-none"
        >
          <option value="">Select repository...</option>
          {repos.map((repo) => (
            <option key={repo.id} value={repo.id}>
              {repo.name}
            </option>
          ))}
        </select>
      </label>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-2.5">
        <label className="flex flex-col gap-1.5 text-xs text-(--muted)">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 rounded-[10px] border border-(--border) bg-(--panel2) px-2.5 text-[13px] text-(--text) outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-xs text-(--muted)">
          Time
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="h-10 rounded-[10px] border border-(--border) bg-(--panel2) px-2.5 text-[13px] text-(--text) outline-none"
          />
        </label>
      </div>

      {/* Title */}
      <label className="flex flex-col gap-1.5 text-xs text-(--muted)">
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='e.g., "Client meeting — scope finalized"'
          autoFocus
          className="h-10 rounded-[10px] border border-(--border) bg-(--panel2) px-2.5 text-[13px] text-(--text) outline-none placeholder:text-(--muted)"
        />
      </label>

      {/* Body */}
      <label className="flex flex-col gap-1.5 text-xs text-(--muted)">
        Notes (optional)
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Details, context, learnings..."
          rows={4}
          className="min-h-[120px] resize-y rounded-[10px] border border-(--border) bg-(--panel2) p-2.5 font-mono text-[12.5px] text-(--text) outline-none placeholder:text-(--muted)"
        />
      </label>

      {/* Tags */}
      <label className="flex flex-col gap-1.5 text-xs text-(--muted)">
        Tags (comma-separated)
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="milestone, decision, experiment"
          className="h-10 rounded-[10px] border border-(--border) bg-(--panel2) px-2.5 text-[13px] text-(--text) outline-none placeholder:text-(--muted)"
        />
      </label>

      {/* Highlight Checkbox */}
      <label className="flex cursor-pointer items-start gap-2.5 rounded-[10px] border border-(--border) bg-(--panel2) p-2.5">
        <input
          type="checkbox"
          checked={isHighlighted}
          onChange={(e) => setIsHighlighted(e.target.checked)}
          className="mt-0.5 h-4 w-4 cursor-pointer accent-(--accent)"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] font-semibold text-white">
            ⭐ 중요 커밋으로 표시
          </span>
          <span className="text-xs text-(--muted)">
            Release에서 하이라이트됩니다
          </span>
        </div>
      </label>
    </Modal>
  );
}
