"use server";

import { createServerClient } from "@/lib/supabase/server";
import { handleError } from "@/lib/utils";

export async function signInAction(email: string, password: string) {
  try {
    const { auth } = await createServerClient();
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}

export async function signUpAction(email: string, password: string) {
  try {
    const { auth } = await createServerClient();
    const { data, error } = await auth.signUp({
      email,
      password,
    });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up");

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}

export async function signOutAction() {
  try {
    const { auth } = await createServerClient();
    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
