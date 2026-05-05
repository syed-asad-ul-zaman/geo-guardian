"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(p => p);

  if (pathname === "/") return null;

  return (
    <nav className="flex items-center gap-2 p-2 overflow-x-auto no-scrollbar">
      <Link href="/" className="text-muted hover:text-foreground transition-colors">
        <Home className="w-3.5 h-3.5" />
      </Link>

      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;
        const title = path.charAt(0).toUpperCase() + path.slice(1);

        return (
          <div key={href} className="flex items-center gap-2 shrink-0">
            <ChevronRight className="w-3.5 h-3.5 text-muted/40" />
            {isLast ? (
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600">
                {title}
              </span>
            ) : (
              <Link href={href} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted hover:text-foreground transition-colors">
                {title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
