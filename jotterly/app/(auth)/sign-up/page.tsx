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

export default function SignUpRoute() {
  return (
    <div className="mt-10 flex flex-1 flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Sign up.
          </CardTitle>
          <CardDescription>
            Sign up to start creating your notes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm type="sign-up" />
        </CardContent>
        <CardFooter>
          <Link
            href="/sign-in"
            className="text-muted-foreground text-xs underline mx-auto"
          >
            Already have an account yet?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
