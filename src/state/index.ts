import { create } from "zustand";
import { type proteins, type dishes, type Themes } from "../data";
import { dates } from "../data/index";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface StepStore {
  step: number;
  increment: () => void;
  decrement: () => void;
}

export const useStepStore = create<StepStore>((set) => ({
  step: 0,
  increment: () => set((state) => ({ step: state.step + 1 })),
  decrement: () => set((state) => ({ step: state.step - 1 })),
}));

interface NextButtonDisableStore {
  disabled: boolean;
  toggleState: (newVal: boolean) => void;
}

export const useNextButtonDisableStore = create<NextButtonDisableStore>(
  (set) => ({
    disabled: false,
    toggleState: (newVal: boolean) => set(() => ({ disabled: newVal })),
  })
);

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
  total: () => number;
}

export const useMealSelectionStore = create<MealSelectionStore>((set, get) => ({
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
  total: () =>
    get().mealSelection.reduce(
      (a, b) =>
        Number(
          a + (b.dish ? b.dish.price : 0) + (b.protein ? b.protein.price : 0)
        ),
      0
    ),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("meal selection", useMealSelectionStore);
}
