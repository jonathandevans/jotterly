"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { createNoteAction } from "@/app/actions";

type Props = {
  user: User | null;
};

export function NewNoteButton({ user }: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      setPending(true);

      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);
      toast.success("New Note Created", {
        description: "You have created a new note",
      });

      setPending(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className="w-24"
      disabled={pending}
    >
      {pending ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}
