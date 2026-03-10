"use client";

import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-03-13T23:59:59+01:00"); // March 13 CET
const REVENUE = 0; // €0 — update if Stripe reports revenue
const GOAL = 100;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ExperimentTicker() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const diff = DEADLINE.getTime() - now.getTime();
  const expired = diff <= 0;

  const days = expired ? 0 : Math.floor(diff / 86400000);
  const hours = expired ? 0 : Math.floor((diff % 86400000) / 3600000);
  const minutes = expired ? 0 : Math.floor((diff % 3600000) / 60000);
  const seconds = expired ? 0 : Math.floor((diff % 60000) / 1000);

  return (
    <div className="neo-panel border-[3px] border-black bg-black text-white p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Countdown */}
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">
            ⏱ Experiment deadline
          </p>
          {expired ? (
            <p className="text-2xl font-black tracking-tight sm:text-3xl">
              TIME&apos;S UP
            </p>
          ) : (
            <div className="flex items-baseline gap-1 font-black">
              <span className="text-3xl sm:text-4xl tabular-nums">{days}</span>
              <span className="text-sm text-white/50">d</span>
              <span className="text-3xl sm:text-4xl tabular-nums">{pad(hours)}</span>
              <span className="text-sm text-white/50">h</span>
              <span className="text-3xl sm:text-4xl tabular-nums">{pad(minutes)}</span>
              <span className="text-sm text-white/50">m</span>
              <span className="text-3xl sm:text-4xl tabular-nums">{pad(seconds)}</span>
              <span className="text-sm text-white/50">s</span>
            </div>
          )}
        </div>

        {/* Revenue */}
        <div className="space-y-1 sm:text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">
            💰 Revenue / Goal
          </p>
          <div className="flex items-baseline gap-2 font-black">
            <span className="text-3xl sm:text-4xl text-accent-yellow">€{REVENUE}</span>
            <span className="text-lg text-white/40">/</span>
            <span className="text-lg text-white/40">€{GOAL}</span>
          </div>
          {/* Progress bar */}
          <div className="h-2 w-full max-w-48 overflow-hidden rounded-full bg-white/20 sm:ml-auto">
            <div
              className="h-full rounded-full bg-accent-yellow transition-all"
              style={{ width: `${Math.min((REVENUE / GOAL) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
