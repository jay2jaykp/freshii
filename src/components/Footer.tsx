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
  const { total } = useMealSelectionStore();

  useEffect(() => {
    toggleState(true);
  }, [step]);

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
