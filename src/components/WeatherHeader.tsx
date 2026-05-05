"use client";

import { Cloud, CloudRain, Sun, Wind, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

interface WeatherHeaderProps {
  weather: any;
  city?: string;
  loading?: boolean;
}

export function WeatherHeader({ weather, city, loading }: WeatherHeaderProps) {
  const temp = weather?.current?.temp_c;
  const condition = weather?.current?.condition?.text;

  return (
    <header className="w-full bg-background/80 backdrop-blur-2xl sticky top-0 z-50 p-2 border-b border-border flex justify-between items-center">
      <div className={cn("flex items-center gap-4", loading && "animate-pulse")}>
        <div className="flex flex-col">
          <h2 className="text-xl text-foreground tracking-tighter uppercase leading-none">Geo-Guardian</h2>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
            <MapPin className="w-2.5 h-2.5" />
            {loading ? "Satellite Uplink..." : city || "Orbiting Earth"}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!loading && weather && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/5 border border-border">
            <Sun className="w-4 h-4 text-warning-600" />
            <span className="text-xs text-foreground tabular-nums">{Math.round(temp)}°C</span>
          </div>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
