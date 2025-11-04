"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-red-500 dark:text-red-500">
          {error.message || ""}
        </h1>
      </div>
    </div>
  );
}
