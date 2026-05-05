"use client";

import { useGlobalState } from "./GlobalStateProvider";
import { cn } from "@/lib/utils";
import { Loader2, Layers, Flame, Wind, Mountain, Snowflake, Activity, Droplets, Sun, CloudFog, Zap, Thermometer, TriangleAlert, Waves } from "lucide-react";
import { motion } from "framer-motion";

export function FilterBar({
  loading,
  currentSort,
  onSortChange
}: {
  loading?: boolean,
  currentSort?: string,
  onSortChange?: (sort: any) => void
}) {
  const { categories, activeCategoryId, setActiveCategoryId } = useGlobalState();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "wildfires": return Flame;
      case "severeStorms": return Wind;
      case "volcanoes": return Mountain;
      case "seaLakeIce": return Waves;
      case "earthquakes": return Activity;
      case "floods": return Droplets;
      case "drought": return Sun;
      case "dustHaze": return CloudFog;
      case "manmade": return Zap;
      case "tempExtremes": return Thermometer;
      case "landslides": return TriangleAlert;
      case "snow": return Snowflake;
      default: return Layers;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-2">
      {categories.map((cat) => {
        const Icon = getCategoryIcon(cat.id);
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategoryId(cat.id)}
            className={cn(
              "group relative flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 whitespace-nowrap cursor-pointer",
              activeCategoryId === cat.id
                ? "bg-transparent text-background border-transparent shadow-lg shadow-foreground/10 z-10 scale-105"
                : "bg-card text-muted border-border hover:border-muted hover:text-foreground"
            )}>
            {loading && activeCategoryId === cat.id ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Icon className={cn(
                "w-3.5 h-3.5 transition-transform duration-300",
                activeCategoryId === cat.id ? "scale-110" : "group-hover:scale-110"
              )} />
            )}
            <span className="text-[12px] font-bold tracking-tight">{cat.title}</span>

            {activeCategoryId === cat.id && (
              <motion.div
                layoutId="active-pill-v7"
                className="absolute inset-0 bg-foreground rounded-full -z-10"
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
