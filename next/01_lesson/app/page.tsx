import Hello from "@/components/hello";
import Image from "next/image";

export default function Home() {
  console.log("Server Components");

  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Hello from Server Components!
      </h1>

      <Hello />
    </div>
  );
}
