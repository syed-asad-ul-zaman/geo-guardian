"use client";

import { motion } from "framer-motion";
import { Search, Loader2, Globe } from "lucide-react";

interface EmptyStateProps {
  type: "no-data" | "loading" | "error";
  message?: string;
}

export function EmptyState({ type, message }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-32 text-center"
    >
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-foreground/5 rounded-full flex items-center justify-center">
          {type === "loading" ? (
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          ) : type === "error" ? (
            <Search className="w-10 h-10 text-error-600" />
          ) : (
            <Globe className="w-10 h-10 text-muted" />
          )}
        </div>
        {type === "loading" && (
          <div className="absolute inset-0 rounded-full border-2 border-primary-600/20 border-t-primary-600 animate-spin" />
        )}
      </div>

      <h3 className="text-xl font-black uppercase tracking-tighter text-foreground mb-2">
        {type === "loading" ? "Satellite Uplink Active" : 
         type === "error" ? "Tactical Signal Lost" : 
         "Quiet Observation"}
      </h3>
      <p className="text-sm text-muted font-medium max-w-[280px] leading-relaxed">
        {message || (
          type === "loading" ? "Syncing with NASA EONET v3. Receiving real-time event packets..." :
          type === "error" ? "Unable to establish contact with NASA data servers. Re-attempting uplink..." :
          "No active events detected in this tactical sector for the last 30 days."
        )}
      </p>
    </motion.div>
  );
}
