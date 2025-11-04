"use client";

import { useEffect, useState } from "react";

const ClientSideDataFetching = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const data = await response.json();
        setAlbums(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Client Side Data Fetching
      </h1>
      <ul className="list-disc list-inside marker:text-sky-500 marker:text-xl space-y-2">
        {albums.map((album: { id: number; title: string }) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </>
  );
};

export default ClientSideDataFetching;
