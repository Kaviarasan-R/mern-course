"use client";

import Link from "next/link";

const Users = () => {
  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
        Users
      </h1>
      <ul className="mt-10 mx-auto">
        <li className="text-xl text-center font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 underline">
          <Link href={"/dashboard/users/1"}>User #1</Link>
        </li>
        <li className="text-xl text-center font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 underline">
          <Link href={"/dashboard/users/2"}>User #2</Link>
        </li>
        <li className="text-xl text-center font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 underline">
          <Link href={"/dashboard/users/3"}>User #3</Link>
        </li>
      </ul>
    </div>
  );
};

export default Users;
