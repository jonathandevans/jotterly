import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { SignOutButton } from "./auth/sign-out-button";
import { getUser } from "@/lib/supabase/server";

export async function Header() {
  const user = await getUser();

  return (
    <header className="relative flex h-20 w-full items-center justify-between bg-popover px-3 sm:px-8">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src={Logo}
          alt="Logo"
          width={60}
          height={60}
          className="rounded-full size-12"
          priority
        />
        <h1 className="text-2xl font-semibold leading-6">Jotterly</h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <SignOutButton />
        ) : (
          <>
            <Button asChild className="hidden sm:block">
              <Link href="/sign-up">Sign up</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
