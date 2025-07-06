"use server";

import { db } from "@/lib/db";
import { getUser } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils";

export async function updateNoteAction(noteId: string, text: string) {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to update a note");

    await db.note.update({
      where: {
        id: noteId,
      },
      data: { text },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
