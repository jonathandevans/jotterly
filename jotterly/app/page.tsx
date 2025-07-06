import { AskAIButton } from "@/components/ask-ai-button";
import { NewNoteButton } from "@/components/new-note-button";
import { NoteTextInput } from "@/components/note-text-input";
import { db } from "@/lib/db";
import { getUser } from "@/lib/supabase/server";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HomeRoute({ searchParams }: Props) {
  const user = await getUser();
  const noteIdParam = (await searchParams).noteId;

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam[0]
    : noteIdParam || "";

  const note = await db.note.findUnique({
    where: {
      id: noteId,
      userId: user?.id,
    },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>
  );
}
