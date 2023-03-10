import React, { useState } from "react";
import { steps } from "~/pages";
import {
  useMyStore,
  useMyDisableStore,
  useMealSelectionStore,
} from "../state/index";
import { useEffect } from "react";

export const Footer: React.FC = () => {
  const { step, increment, decrement } = useMyStore((state) => state);
  const { disabled, toggleState } = useMyDisableStore((state) => state);
  const { mealSelection } = useMealSelectionStore();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    toggleState(true);
  }, [step]);

  useEffect(() => {
    setTotal(
      mealSelection.reduce(
        (a, b) =>
          Number(
            a + (b.dish ? b.dish.price : 0) + (b.protein ? b.protein.price : 0)
          ),
        0
      )
    );
  }, [mealSelection]);
  return (
    <footer className="sticky bottom-0 w-screen bg-neutral p-4">
      <div className=" flex items-center justify-between">
        <button
          disabled={step === 0}
          onClick={decrement}
          className="btn-secondary btn"
        >
          Previous
        </button>
        <p>Total: {total.toFixed(2)}</p>
        <button
          disabled={disabled}
          onClick={increment}
          className={`btn-secondary btn ${
            !disabled ? "animate-bounce" : ""
          } hover:animate-none`}
        >
          Next
        </button>
      </div>
    </footer>
  );
};
