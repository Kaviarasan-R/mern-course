"use client";
import { useEffect } from "react";

const Hello = () => {
  useEffect(() => {
    console.log("Client Components");
  }, []);

  return (
    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
      Hello from Client Components!
    </h1>
  );
};

export default Hello;
