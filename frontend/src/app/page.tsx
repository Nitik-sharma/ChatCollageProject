"use client";

import { Spotlight } from "../../components/spotlight-new";
import Link from "next/link";

import { ButtonsCard } from "../../components/tailwindcss-buttons";

export default function Home() {
  return (
    <div className="h-[40rem] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Welcome to Chat App
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          You need to Register or Login to continue.
        </p>
        <div className=" flex justify-center items-center">
          <Link href="/register">
            <ButtonsCard className={" "} />
            
           
          </Link>
         
        </div>
      </div>
    </div>
  );
}
