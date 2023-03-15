import React, { useState } from "react";
import { steps } from "~/pages";
import {
  useStepStore,
  useNextButtonDisableStore,
  useMealSelectionStore,
} from "../state/index";
import { useEffect } from "react";

export const Footer: React.FC = () => {
  const { step, increment, decrement } = useStepStore((state) => state);
  const { disabled } = useNextButtonDisableStore((state) => state);
  const { total } = useMealSelectionStore();

  return (
    <footer className="w-screen bg-neutral p-4">
      <div className="flex items-center justify-between">
        <button
          disabled={step === 0}
          onClick={decrement}
          className="btn-secondary btn"
        >
          Previous
        </button>
        {[2].includes(step) && (
          <p className="text-secondary">Total: {total().toFixed(2)}</p>
        )}

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
