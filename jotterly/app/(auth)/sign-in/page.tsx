import { AuthForm } from "@/components/auth/auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignInRoute() {
  return (
    <div className="mt-10 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Sign in.
          </CardTitle>
          <CardDescription>
            Sign in to your account to access your notes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm type="sign-in" />
        </CardContent>
        <CardFooter>
          <Link
            href="/sign-up"
            className="text-muted-foreground text-xs underline mx-auto"
          >
            Don't have an account yet?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
