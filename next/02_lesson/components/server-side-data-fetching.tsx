"use cache";

import { cacheLife, cacheTag } from "next/cache";

const ServerSideDataFetching = async () => {
  cacheLife("default");
  // cacheTag("test");

  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const data = await response.json();

  return (
    <>
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Server Side Data Fetching
      </h1>
      <ul className="list-disc list-inside marker:text-sky-500 marker:text-xl space-y-2">
        {data.slice(0, 5).map((album: { id: number; title: string }) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </>
  );
};

export default ServerSideDataFetching;
