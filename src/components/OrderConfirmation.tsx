import React from "react";
import { useMealSelectionStore, useMyDisableStore } from "../state/index";
import { useEffect } from "react";

export const OrderConfirmation: React.FC = () => {
  const { mealSelection } = useMealSelectionStore();
  const { toggleState } = useMyDisableStore();
  useEffect(() => {
    toggleState(false);
  }, []);
  return (
    <>
      {mealSelection.map((each) => (
        <div
          key={each.date.toString()}
          className="mb-2 w-full rounded-lg border-2 border-neutral"
        >
          <div
            className={`flex items-center justify-between px-2 text-center ${
              each.skip ? "bg-warning" : "bg-success"
            }`}
          >
            <p className="p-2 text-xl">{each.date.toDateString()}</p>
            {each.skip && <p className="p-2 text-xl">Skipped!</p>}
          </div>
          {!each.skip && (
            <div className="flex justify-center gap-2 text-center capitalize">
              <div className="w-1/6 ">
                <img src={each.dish?.image} alt={each.dish?.name} />
                <p>{each.dish?.name}</p>
              </div>
              <div className="w-1/6 ">
                <img src={each.protein?.image} alt={each.protein?.name} />
                <p>{each.protein?.name}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};
