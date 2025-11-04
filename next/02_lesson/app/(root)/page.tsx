import Hello from "@/components/hello";
import ClientSideDataFetching from "@/components/client-side-data-fetching";
import Image from "next/image";
import ServerSideDataFetching from "@/components/server-side-data-fetching";

export default async function Home() {
  console.log("Server Components");

  const response = await fetch("http://localhost:3000/api/books");
  const data = await response.json();

  return (
    <div className="flex flex-col gap-10 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
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
      <ClientSideDataFetching />
      <ServerSideDataFetching />

      <>
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          API Routes
        </h1>
        <ul className="list-disc list-inside marker:text-sky-500 marker:text-xl space-y-2">
          {data.map((book: { id: number; name: string }) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </>
    </div>
  );
}
