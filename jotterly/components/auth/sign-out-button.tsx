"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOutAction } from "@/app/(auth)/actions";

export function SignOutButton() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSignout = async () => {
    setPending(true);

    const { errorMessage } = await signOutAction();
    if (!errorMessage) {
      toast.success("Logged out", {
        description: "You have been successfully logged out",
      });
      router.push("/");
    } else {
      toast.error("Error", {
        description: errorMessage,
      });
    }

    setPending(false);
  };

  return (
    <Button variant="outline" onClick={handleSignout} disabled={pending}>
      {pending ? <Loader2 className="size-4 animate-spin" /> : "Sign out"}
    </Button>
  );
}
