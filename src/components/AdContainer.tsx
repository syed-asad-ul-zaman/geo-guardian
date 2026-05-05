"use client";

import { cn } from "@/lib/utils";

interface AdContainerProps {
  id: string;
}

export function AdContainer({ id }: AdContainerProps) {
  return (
    <div
      className="w-full bg-ad-slot dark:bg-neutral-800 h-32 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 overflow-hidden"
      role="complementary"
      aria-label="Advertisement"
    >
      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Sponsored</span>
      <div className="text-neutral-500 dark:text-neutral-400 text-sm italic">
        Google Ads Placement - {id}
      </div>
      {/* 
        In production, this would be:
        <ins className="adsbygoogle" ... />
      */}
    </div>
  );
}
