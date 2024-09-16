import { create } from "zustand";

interface State {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}
interface monthState {
  currentMonth: string;
  setCurrentMonth: (month: string) => void;
}

export const useStore = create<State>((set) => ({
  darkMode: false,
  setDarkMode: (darkMode: boolean) => set({ darkMode }),
}));
export const useMonthStore = create<monthState>((set) => ({
  currentMonth: "January",
  setCurrentMonth: (month: string) => set({ currentMonth: month }),
}));
