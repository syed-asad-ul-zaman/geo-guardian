"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, ArrowRight, Layers, Flame, Wind, Mountain, Snowflake, Activity, Droplets, Sun, CloudFog, Zap, Thermometer, TriangleAlert, Waves } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatDistance, getProximityTier } from "@/lib/geo";
import { EONETEvent } from "@/lib/api";
import { useGlobalState } from "./GlobalStateProvider";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: EONETEvent;
  distance: number;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } }
};

export function EventCard({ event, distance }: EventCardProps) {
  const { setSelectedEvent } = useGlobalState();
  const latestGeometry = event.geometry[event.geometry.length - 1];
  const date = new Date(latestGeometry.date);
  const tier = getProximityTier(distance);

  const categoryId = event.categories[0]?.id;
  const CategoryIcon =
    categoryId === "wildfires" ? Flame :
      categoryId === "severeStorms" ? Wind :
        categoryId === "volcanoes" ? Mountain :
          categoryId === "seaLakeIce" ? Waves :
            categoryId === "earthquakes" ? Activity :
              categoryId === "floods" ? Droplets :
                categoryId === "drought" ? Sun :
                  categoryId === "dustHaze" ? CloudFog :
                    categoryId === "manmade" ? Zap :
                      categoryId === "tempExtremes" ? Thermometer :
                        categoryId === "landslides" ? TriangleAlert :
                          categoryId === "snow" ? Snowflake :
                            Layers;

  return (
    <motion.div
      variants={itemVariants}
      className="premium-card w-full rounded-4xl overflow-hidden group cursor-pointer space-y-4"
      onClick={() => setSelectedEvent(event)}
    >
      <div className="p-4 md:p-6 flex gap-8 items-center justify-between">
        {/* Category Visual */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-16 h-16 shrink-0 rounded-3xl bg-foreground/5 flex items-center justify-center relative shadow-inner"
        >
          <CategoryIcon className="w-8 h-8 text-foreground group-hover:text-primary-600" />
          {tier !== "global" && (
            <div className={cn(
              "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-card animate-pulse",
              tier === "critical" ? "bg-error-600" : "bg-warning-600"
            )} />
          )}
        </motion.div>

        {/* Content */}
        <div className="w-full flex-1 min-w-0 space-y-4">
          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-muted">
            <span>{event.categories[0]?.title}</span>
            <div className="w-1 h-1 bg-muted rounded-full" />
            <span className="text-[8px] tabular-nums">{formatDistanceToNow(date, { addSuffix: true })}</span>
          </div>

          <h6 className="text-lg md:text-xl font-bold tracking-tighter leading-tight text-foreground line-clamp-1 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h6>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 px-2 py-1 rounded-2xl bg-foreground/5 border border-border">
              <MapPin className="w-2.5 h-2.5 text-primary-600" />
              <span className="text-[8px] tabular-nums text-foreground">{formatDistance(distance)}</span>
            </div>
            {latestGeometry.magnitudeValue && (
              <div className="flex items-center gap-2 px-2 py-1 rounded-2xl bg-foreground/5 border border-border">
                <Activity className="w-2.5 h-2.5 text-primary-600" />
                <span className="text-[8px] tabular-nums text-foreground">
                  {latestGeometry.magnitudeValue} {latestGeometry.magnitudeUnit}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-300">
          <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform text-foreground group-hover:text-background" />
        </div>
      </div>
    </motion.div>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="premium-card w-full rounded-4xl p-8 md:p-10 flex gap-8 items-center justify-between animate-pulse">
      <div className="w-16 h-16 shrink-0 rounded-3xl bg-foreground/5 shimmer" />
      <div className="flex-1 space-y-4">
        <div className="h-4 bg-foreground/5 w-1/4 rounded shimmer" />
        <div className="h-10 bg-foreground/5 w-3/4 rounded-xl shimmer" />
        <div className="flex gap-4">
          <div className="h-8 bg-foreground/5 w-24 rounded-2xl shimmer" />
          <div className="h-8 bg-foreground/5 w-24 rounded-2xl shimmer" />
        </div>
      </div>
    </div>
  );
}
