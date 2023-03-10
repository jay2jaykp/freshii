import { create } from "zustand";
import { type proteins, type dishes, Themes } from "../data";
import { dates } from "../data/index";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface MyState {
  step: number;
  increment: () => void;
  decrement: () => void;
}

export const useMyStore = create<MyState>((set) => ({
  step: 0,
  increment: () => set((state) => ({ step: state.step + 1 })),
  decrement: () => set((state) => ({ step: state.step - 1 })),
}));

interface MyDisabledStore {
  disabled: boolean;
  toggleState: (newVal: boolean) => void;
}

export const useMyDisableStore = create<MyDisabledStore>((set) => ({
  disabled: false,
  toggleState: (newVal: boolean) => set(() => ({ disabled: newVal })),
}));

interface StudentInformationStore {
  name: string;
  email: string;
  number: string;
  updateInformation: (
    field: "name" | "email" | "number",
    value: string
  ) => void;
}

export const useStudentStore = create<StudentInformationStore>((set) => ({
  name: "",
  email: "",
  number: "",
  updateInformation: (field: "name" | "email" | "number", value: string) =>
    set(() => ({ [field]: value })),
}));

interface MealSelection {
  date: Date;
  dish: (typeof dishes)[0] | null;
  protein: (typeof proteins)[0] | null;
  skip: boolean;
}

interface MealSelectionStore {
  mealSelection: MealSelection[];
  setMealSelection: (meal: MealSelection, type: "main" | "protein") => void;
  skipMealSelection: (date: Date, skip: boolean) => void;
}

export const useMealSelectionStore = create<MealSelectionStore>((set) => ({
  mealSelection: dates.map((date) => ({
    date: new Date(date),
    dish: null,
    protein: null,
    skip: false,
  })),
  skipMealSelection: (date: Date, skip: boolean) =>
    set((state) => ({
      mealSelection: state.mealSelection.map((each) => {
        if (each.date.toDateString() === date.toDateString()) {
          each.skip = skip;
          if (skip) {
            each.dish = null;
            each.protein = null;
          }
        }
        return each;
      }),
    })),
  setMealSelection: (meal: MealSelection, type: "main" | "protein") =>
    set((state) => ({
      mealSelection: state.mealSelection.map((each) => {
        if (each.date.toDateString() === meal.date.toDateString()) {
          if (type === "main") {
            each.dish = meal.dish;
            each.skip = false;
          }
          if (type === "protein") {
            each.protein = meal.protein;
            each.skip = false;
          }
        }
        return each;
      }),
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("meal selection", useMealSelectionStore);
}

type Theme = (typeof Themes)[number];

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "corporate",
  setTheme: (theme: Theme) =>
    set(() => ({
      theme,
    })),
}));
