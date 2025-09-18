/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { Calendar, GitBranch, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

// Generate mock contribution data for demonstration
const generateContributionData = (): ContributionData[] => {
  const data: ContributionData[] = [];
  const today = new Date();
  const oneYear = 365;

  for (let i = oneYear; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const randomValue = Math.random();
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (randomValue > 0.7) {
      count = Math.floor(Math.random() * 3) + 1;
      level = 1;
    }
    if (randomValue > 0.8) {
      count = Math.floor(Math.random() * 5) + 3;
      level = 2;
    }
    if (randomValue > 0.9) {
      count = Math.floor(Math.random() * 8) + 6;
      level = 3;
    }
    if (randomValue > 0.95) {
      count = Math.floor(Math.random() * 12) + 10;
      level = 4;
    }

    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level
    });
  }

  return data;
};

const mockStats: GitHubStats = {
  totalContributions: 1247,
  longestStreak: 87,
  currentStreak: 12,
  totalRepositories: 42
};

interface TooltipProps {
  data: ContributionData;
  x: number;
  y: number;
  visible: boolean;
}

const ContributionTooltip: React.FC<TooltipProps> = ({ data, x, y, visible }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed z-50 px-3 py-2 rounded-lg shadow-xl",
            "glass border border-border/50 text-sm",
            "pointer-events-none whitespace-nowrap"
          )}
          style={{
            left: x,
            top: y - 60,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-foreground font-medium">
            {data.count === 0 ? 'No contributions' : `${data.count} contribution${data.count === 1 ? '' : 's'}`}
          </div>
          <div className="text-muted-foreground text-xs">
            {formatDate(data.date)}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export function GitHubHeatmap({ className }: { className?: string }) {
  const [contributionData, setContributionData] = useState<ContributionData[]>([]);
  const [hoveredCell, setHoveredCell] = useState<{
    data: ContributionData;
    x: number;
    y: number;
  } | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('year');

  useEffect(() => {
    setContributionData(generateContributionData());
  }, []);

  const getLevelColor = (level: number): string => {
    const colors = [
      'bg-muted/30', // level 0
      'bg-green-900/40 border-green-800/30', // level 1
      'bg-green-700/50 border-green-600/40', // level 2  
      'bg-green-500/60 border-green-400/50', // level 3
      'bg-green-400/70 border-green-300/60', // level 4
    ];
    return colors[level] || colors[0];
  };

  const getWeekdayName = (index: number): string => {
    const weekdays = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
    return weekdays[index] || '';
  };

  const getMonthName = (month: number): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  };

  // Group data by weeks
  const groupedData = [];
  for (let i = 0; i < contributionData.length; i += 7) {
    groupedData.push(contributionData.slice(i, i + 7));
  }

  const handleCellHover = (data: ContributionData, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setHoveredCell({
      data,
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY
    });
  };

  const handleCellLeave = () => {
    setHoveredCell(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Stats */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">GitHub Activity</h3>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{mockStats.totalContributions} contributions in the last year</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-subtle rounded-lg p-4 border border-border/30">
          <div className="text-2xl font-bold text-foreground">{mockStats.totalContributions}</div>
          <div className="text-sm text-muted-foreground">Total contributions</div>
        </div>
        <div className="glass-subtle rounded-lg p-4 border border-border/30">
          <div className="text-2xl font-bold text-green-400">{mockStats.currentStreak}</div>
          <div className="text-sm text-muted-foreground">Current streak</div>
        </div>
        <div className="glass-subtle rounded-lg p-4 border border-border/30">
          <div className="text-2xl font-bold text-yellow-400">{mockStats.longestStreak}</div>
          <div className="text-sm text-muted-foreground">Longest streak</div>
        </div>
        <div className="glass-subtle rounded-lg p-4 border border-border/30">
          <div className="text-2xl font-bold text-blue-400">{mockStats.totalRepositories}</div>
          <div className="text-sm text-muted-foreground">Public repositories</div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="glass-subtle rounded-lg p-6 border border-border/30">
        <div className="overflow-x-auto">
          <div className="min-w-[800px] space-y-3">
            {/* Month Labels */}
            <div className="flex gap-1 ml-8">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="w-[60px] text-xs text-muted-foreground text-center">
                  {getMonthName(i)}
                </div>
              ))}
            </div>

            {/* Weekday Labels and Grid */}
            <div className="flex gap-1">
              {/* Weekday labels */}
              <div className="flex flex-col gap-1 w-8">
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={i} className="h-3 flex items-center text-xs text-muted-foreground">
                    {getWeekdayName(i)}
                  </div>
                ))}
              </div>

              {/* Contribution grid */}
              <div className="flex gap-1">
                {groupedData.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className={cn(
                          "w-3 h-3 rounded-sm border transition-all duration-200 cursor-pointer",
                          getLevelColor(day.level),
                          "hover:border-primary/50 hover:scale-110"
                        )}
                        onMouseEnter={(e) => handleCellHover(day, e)}
                        onMouseLeave={handleCellLeave}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-4 border-t border-border/20">
              <div className="text-sm text-muted-foreground">
                Less
              </div>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={cn(
                      "w-3 h-3 rounded-sm border",
                      getLevelColor(level)
                    )}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                More
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip */}
        {hoveredCell && (
          <ContributionTooltip
            data={hoveredCell.data}
            x={hoveredCell.x}
            y={hoveredCell.y}
            visible={true}
          />
        )}
      </div>

      {/* Recent Activity */}
      <div className="glass-subtle rounded-lg p-6 border border-border/30">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          Recent Activity
        </h4>
        <div className="space-y-3">
          {[
            { action: "Pushed to", repo: "portfolio-dashboard", time: "2 hours ago" },
            { action: "Created issue in", repo: "smart-home-iot", time: "1 day ago" },
            { action: "Starred", repo: "nextjs/next.js", time: "2 days ago" },
            { action: "Opened PR in", repo: "vercel/turbo", time: "3 days ago" },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-2 border-b border-border/10 last:border-b-0"
            >
              <div className="text-sm">
                <span className="text-muted-foreground">{activity.action}</span>
                <span className="text-primary ml-1 font-medium">{activity.repo}</span>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}