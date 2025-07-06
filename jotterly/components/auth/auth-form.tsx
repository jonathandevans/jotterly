"use client";

import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signInAction, signUpAction } from "@/app/(auth)/actions";

export function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;
      if (type === "sign-in") {
        errorMessage = (await signInAction(email, password)).errorMessage;
        title = "Signed in";
        description = "You have been successfully logged in.";
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Signed up";
        description = "Check your email for a confirmation link.";
      }

      if (!errorMessage) {
        toast.success(title, {
          description,
        });
        if (type == "sign-in") router.replace("/");
        else router.replace("/sign-in");
      } else {
        toast.error("Error", {
          description: errorMessage,
        });
      }
    });
  };

  return (
    <form action={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          disabled={pending}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          disabled={pending}
        />
      </div>

      <Button className="w-full mt-2" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Please wait
          </>
        ) : type === "sign-in" ? (
          "Sign in"
        ) : (
          "Sign up"
        )}
      </Button>
    </form>
  );
}
