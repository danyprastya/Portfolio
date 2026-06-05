"use client";

import React, { useState, useEffect } from "react";
import { Calendar, GitBranch } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ContributionData {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubStats {
  totalContributions: number;
  longestStreak: number;
  currentStreak: number;
  totalRepositories: number;
}

interface TooltipProps {
  data: ContributionData;
  x: number;
  y: number;
  visible: boolean;
}

const ContributionTooltip: React.FC<TooltipProps> = ({ data, x, y, visible }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "fixed z-50 px-3 py-2 rounded-lg shadow-xl",
            "glass border border-border/50 text-sm",
            "pointer-events-none whitespace-nowrap"
          )}
          style={{ left: x, top: y - 60, transform: "translateX(-50%)" }}
        >
          <div className="text-foreground font-medium">
            {data.count === 0
              ? "No contributions"
              : `${data.count} contribution${data.count === 1 ? "" : "s"}`}
          </div>
          <div className="text-muted-foreground text-xs">{formatDate(data.date)}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const getLevelColor = (level: number): string => {
  const colors = [
    "bg-muted/30 border-transparent",
    "bg-green-900/40 border-green-800/30",
    "bg-green-700/50 border-green-600/40",
    "bg-green-500/60 border-green-400/50",
    "bg-green-400/70 border-green-300/60",
  ];
  return colors[level] ?? colors[0];
};

const getWeekdayLabel = (index: number): string => {
  return ["", "Mon", "", "Wed", "", "Fri", ""][index] ?? "";
};

const getMonthName = (month: number): string => {
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][month] ?? "";
};

export function GitHubHeatmap({ className }: { className?: string }) {
  const [contributions, setContributions] = useState<ContributionData[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{
    data: ContributionData;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setContributions(data.contributions);
        setStats(data.stats);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const groupedByWeek = [];
  for (let i = 0; i < contributions.length; i += 7) {
    groupedByWeek.push(contributions.slice(i, i + 7));
  }

  const handleCellHover = (data: ContributionData, e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setHoveredCell({ data, x: rect.left + rect.width / 2, y: rect.top + window.scrollY });
  };

  if (loading) {
    return (
      <div className={cn("space-y-4 animate-pulse", className)}>
        <div className="h-6 bg-muted/30 rounded w-48" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-muted/20 rounded-lg" />
          ))}
        </div>
        <div className="h-40 bg-muted/20 rounded-lg" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className={cn("rounded-lg p-6 border border-border/30 text-center text-muted-foreground text-sm", className)}>
        GitHub activity unavailable right now.
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">GitHub Activity</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{stats.totalContributions} contributions in the last year</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total contributions", value: stats.totalContributions, color: "text-foreground" },
          { label: "Current streak", value: `${stats.currentStreak}d`, color: "text-green-400" },
          { label: "Longest streak", value: `${stats.longestStreak}d`, color: "text-yellow-400" },
          { label: "Public repos", value: stats.totalRepositories, color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="glass-subtle rounded-lg p-4 border border-border/30">
            <div className={cn("text-2xl font-bold", s.color)}>{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="glass-subtle rounded-lg p-6 border border-border/30">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] space-y-3">
            {/* Month labels */}
            <div className="flex gap-1 ml-8">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="w-[60px] text-xs text-muted-foreground text-center">
                  {getMonthName(i)}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              {/* Weekday labels */}
              <div className="flex flex-col gap-1 w-8">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="h-3 flex items-center text-xs text-muted-foreground">
                    {getWeekdayLabel(i)}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex gap-1">
                {groupedByWeek.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => (
                      <motion.div
                        key={`${wi}-${di}`}
                        className={cn(
                          "w-3 h-3 rounded-sm border cursor-pointer",
                          getLevelColor(day.level),
                          "hover:border-primary/50"
                        )}
                        whileHover={{ scale: 1.3 }}
                        onMouseEnter={(e) => handleCellHover(day, e)}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-border/20">
              <span className="text-xs text-muted-foreground">Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div key={level} className={cn("w-3 h-3 rounded-sm border", getLevelColor(level))} />
              ))}
              <span className="text-xs text-muted-foreground">More</span>
            </div>
          </div>
        </div>

        {hoveredCell && (
          <ContributionTooltip
            data={hoveredCell.data}
            x={hoveredCell.x}
            y={hoveredCell.y}
            visible={true}
          />
        )}
      </div>
    </div>
  );
}