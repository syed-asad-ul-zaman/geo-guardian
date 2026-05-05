"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map as MapIcon, Bell, Shield, Settings, Book } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className={cn(
      "fixed z-200 backdrop-blur-3xl transition-all duration-300 border-border bg-white/80 dark:bg-black/80 flex justify-around items-center",
      "bottom-0 left-0 w-full rounded-none border-t px-4 py-2 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]",
      "md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:max-w-md md:rounded-full md:border md:px-6 md:py-4 md:shadow-2xl md:shadow-black/20"
    )}>
      <NavItem href="/" icon={Home} active={pathname === "/"} />
      <NavItem href="/map" icon={MapIcon} active={pathname === "/map"} />
      <NavItem href="/alerts" icon={Bell} active={pathname === "/alerts"} />
      <NavItem href="/safety" icon={Shield} active={pathname === "/safety"} />
      <NavItem href="/docs" icon={Book} active={pathname === "/docs"} />
      <NavItem href="/settings" icon={Settings} active={pathname === "/settings"} />
    </nav>
  );
}

function NavItem({ href, icon: Icon, active }: { href: string; icon: any; active: boolean }) {
  return (
    <Link href={href} className="group relative py-1 px-3">
      <Icon className={cn(
        "w-6 h-6 transition-all duration-300",
        active ? "text-primary-600 scale-110" : "text-muted hover:text-foreground hover:scale-110"
      )} />
      {active && (
        <div className="absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full" />
      )}
    </Link>
  );
}
