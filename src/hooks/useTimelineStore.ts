// src/hooks/useTimelineStore.ts
import { create } from "zustand";
import eventsData from "../api/events.json";

export interface EventItem {
  year: number;
  description: string;
}

export interface Period {
  start: number;
  end: number;
  theme: string;
  events: EventItem[];
}

interface TimelineState {
  currentIndex: number;
  periods: Period[];
  totalPeriods: number;
  nextPeriod: () => void;
  prevPeriod: () => void;
  setPeriodByIndex: (index: number) => void;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  currentIndex: 0,
  periods: (eventsData as Period[]),
  totalPeriods: (eventsData as Period[]).length,

  nextPeriod: () => {
    const { currentIndex, totalPeriods } = get();
    if (currentIndex < totalPeriods - 1) {
      set({ currentIndex: currentIndex + 1 });
    }
  },

  prevPeriod: () => {
    const { currentIndex } = get();
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 });
    }
  },

  setPeriodByIndex: (index: number) => {
    const { totalPeriods } = get();
    if (index >= 0 && index < totalPeriods) {
      set({ currentIndex: index });
    }
  },
}));
