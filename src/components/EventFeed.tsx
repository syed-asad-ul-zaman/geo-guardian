"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { EventCard, EventCardSkeleton } from "./EventCard";
import { AdContainer } from "./AdContainer";
import { FilterBar } from "./FilterBar";
import { useEONETFeed } from "@/hooks/useEONETFeed";
import { useLocation } from "@/hooks/useLocation";
import { EONETEvent } from "@/lib/api";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface EventFeedProps {
  initialEvents: EONETEvent[];
}

import { EmptyState } from "./EmptyState";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export function EventFeed({ initialEvents }: EventFeedProps) {
  const { location } = useLocation();
  const {
    events,
    setSortOrder,
    loading
  } = useEONETFeed(initialEvents, location);

  const [displayLimit, setDisplayLimit] = useState(10);
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView && displayLimit < events.length) {
      setTimeout(() => setDisplayLimit(prev => prev + 10), 400);
    }
  }, [inView, events.length]);

  return (
    <div className="w-full space-y-4">
      <div className="sticky top-15 z-40 bg-background/80 backdrop-blur-3xl">
        <FilterBar
          currentSort="recent"
          onSortChange={setSortOrder}
          loading={loading}
        />
      </div>

      <div
        className="w-full min-h-[60vh] px-4"
        role="region"
        aria-live="polite"
        aria-label="Natural Event Feed"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </motion.div>
          ) : events.length > 0 ? (
            <motion.div
              key="content"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {events.slice(0, displayLimit).map((item, index) => (
                <div key={`${item.event.id}-${index}`}>
                  <EventCard event={item.event} distance={item.distance} />
                  {index > 0 && (index + 1) % 2 === 0 && (
                    <motion.div variants={containerVariants} className="mt-4">
                      <AdContainer id={`premium-native-${index}`} />
                    </motion.div>
                  )}
                </div>
              ))}

              {displayLimit < events.length && (
                <div ref={ref} className="py-24 flex flex-col items-center justify-center gap-6">
                  <div className="w-10 h-10 rounded-full border-2 border-primary-600/20 border-t-primary-600 animate-spin" />
                  <span className="text-[10px] font-black text-muted uppercase tracking-[0.4em]">Establishing Uplink...</span>
                </div>
              )}
            </motion.div>
          ) : (
            <EmptyState key="empty" type="no-data" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
