"use client";

import { NoteProviderContext } from "@/components/providers/note-provider";
import { useContext } from "react";

export function useNote() {
  const context = useContext(NoteProviderContext);
  if (!context) throw new Error("useNote must be used within a NoteProvider");

  return context;
}
