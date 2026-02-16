"use client";

import { useEffect, useState } from "react";

function ClerkSignIn() {
  const [SignIn, setSignIn] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import("@clerk/nextjs").then((mod) => {
      setSignIn(() => mod.SignIn);
    });
  }, []);

  if (!SignIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <SignIn />
    </div>
  );
}

export default function SignInPage() {
  return <ClerkSignIn />;
}
