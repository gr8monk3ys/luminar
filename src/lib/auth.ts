import { auth, currentUser } from "@clerk/nextjs/server";

const isClerkConfigured =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY;

export async function getAuthUserId(): Promise<string | null> {
  if (!isClerkConfigured) return null;
  const { userId } = await auth();
  return userId;
}

export async function getAuthUser() {
  if (!isClerkConfigured) return null;
  return currentUser();
}

export { isClerkConfigured };
