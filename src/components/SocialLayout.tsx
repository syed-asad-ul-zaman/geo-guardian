"use client";

import { WeatherHeaderClient } from "./WeatherHeaderClient";
import { MobileNav } from "./MobileNav";
import { Breadcrumbs } from "./Breadcrumbs";

interface SocialLayoutProps {
  children: React.ReactNode;
}

export function SocialLayout({ children }: SocialLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-background text-gray-900 dark:text-gray-100 selection:bg-primary-600 selection:text-white">
      <main className="w-full mx-auto flex flex-col items-center border-x border-gray-200 dark:border-border h-full bg-white dark:bg-background shadow-2xl relative overflow-y-auto no-scrollbar pb-20 md:pb-4">
        <div className="sticky top-0 z-50 w-full">
          <WeatherHeaderClient />
        </div>
        <div className="w-full md:px-2">
          <Breadcrumbs />
        </div>
        <div className="w-full">
          {children}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
