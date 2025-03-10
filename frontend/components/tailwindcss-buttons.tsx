"use client";
import React from "react";
import { IconClipboard } from "@tabler/icons-react";
import { cn } from "../lib/utils";
import Link from "next/link";

export const ButtonsCard = ({ children, className, onClick }) => {
  return (
    // Button code
    <div className=" flex items-center justify-center gap-3">
      <Link href={"/register"}>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Register
        </button>
      </Link>

      <Link href="login">
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          login
        </button>
      </Link>
    </div>

    // tailwind.config.js code
  );
};
