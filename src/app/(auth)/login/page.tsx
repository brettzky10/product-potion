
import Link from "next/link";
import { SubmitButton } from "@/components/auth/submit-button";
import { signIn, signUp, signInWithGoogleOAuth } from "@/lib/actions/auth";
import { createClient } from "@/lib/supabase/supabase-client";

//import { KeyRound } from 'lucide-react'
import { FcGoogle } from "react-icons/fc"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound } from "lucide-react";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const handleSignInWithGoogle = async () => {
    "use server"
    try {
      await signInWithGoogleOAuth();
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleResetPassword = async () => {
    "use server"
    const supabase = createClient();
    const email = prompt("Enter Email");
    if (!email) {
      console.error("No valid Email");
      return;
    }
    email.trim();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/password-reset`,
    });
    if (data) alert("Recovery Link sent to " + email);
    if (error) alert("Error while sending password reset link to " + email);
  };
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 relative">
      <div className="glowBox -z-0">

      </div>
      
      <Card className="absolute z-10 w-full mx-auto max-w-7xl bg-white">
        <CardHeader className="flex flex-row gap-5 justify-between items-center">
          <Button asChild size={"sm"}>

          
        <Link
        href="/"
        className="z-10 left-8 top-8 py-2 px-4 rounded-md no-underline bg-primary hover:bg-primary/70 flex items-center group text-sm text-primary-foreground"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      </Button>
      <div className="flex flex-row gap-3 items-center">
        <KeyRound width={15} height={15}/>
        <p className="font-bold text-xl">
        Login
        </p>
      </div>
      
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-9 ">
            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                placeholder="you@example.com"
                required
              />
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                placeholder="••••••••"
                //required
              />
              <SubmitButton
                formAction={signIn}
                className="bg-primary rounded-md px-4 py-2 text-primary-foreground mb-2"
                pendingText="Signing In..."
              >
                Sign In
              </SubmitButton>
              <SubmitButton
                formAction={signUp}
                className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                pendingText="Signing Up..."
              >
                Sign Up
              </SubmitButton>

              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                  {searchParams.message}
                </p>
              )}
            </form>

            <Button
              onClick={handleSignInWithGoogle}
              className="rounded-md px-4 py-2 text-primary-foreground gap-2 mb-2"
            >
              <FcGoogle width={15} height={15}/> 
              Google SignIn
              </Button>
            <button
              onClick={handleResetPassword}
              className="font-extralight text-left text-primary"
            >
              Forgot password
            </button>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}