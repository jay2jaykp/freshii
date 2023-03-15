import React, { PropsWithChildren, useState } from "react";
import { dishes } from "~/data";
import { proteins } from "../data/index";
import { useMealSelectionStore, useMyDisableStore } from "../state/index";
import { useEffect } from "react";

const SubHeading: React.FC<{ title: string }> = ({ title }) => {
  return <p className="mb-2 text-center text-xl">{title}</p>;
};

export const MealSelection: React.FC = () => {
  const { mealSelection, setMealSelection, skipMealSelection } =
    useMealSelectionStore();
  const { toggleState } = useMyDisableStore();

  useEffect(() => {
    if (
      mealSelection.filter(
        (e) => (e.dish === null || e.protein === null) && !e.skip
      ).length > 0
    ) {
      toggleState(true);
    } else {
      toggleState(false);
    }
  }, [mealSelection]);
  // const [selectedMeal, setSelectedMeal] = useState<null | (typeof dishes)[0]>(
  //   null
  // );
  // const [selectedProtein, setSelectedProtein] = useState<
  //   null | (typeof proteins)[0]
  // >(null);
  return (
    <div className="w-screen p-2">
      {mealSelection.map((each) => (
        <div
          key={each.date.toString()}
          className=" w-full rounded-lg border-2 border-neutral"
        >
          <div
            className={`sticky top-0 flex items-center  justify-between px-2 text-center text-neutral ${
              (each.dish === null || each.protein === null) &&
              each.skip === false
                ? "bg-warning"
                : "bg-success"
            }`}
          >
            <div className="flex flex-wrap items-center">
              <p className="p-2 text-xl">{each.date.toDateString()} </p>
              <p className="bg-error text-secondary">
                {(each.dish === null || each.protein === null) &&
                each.skip === false
                  ? "Please make the selection"
                  : ""}
              </p>
            </div>
            <div className="items-around flex flex-wrap justify-around gap-2">
              <span>Skip day</span>
              <input
                type="checkbox"
                className="toggle-error toggle toggle-md"
                checked={each.skip}
                onChange={(e) => {
                  skipMealSelection(each.date, e.target.checked);
                }}
              />
            </div>
          </div>
          {!each.skip && (
            <div className="block justify-around sm:flex sm:flex-wrap">
              <div className="p-2">
                <SubHeading title="Select Main Dish - $8.99" />
                <div className="overflow-scroll sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
                  {dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className={`${
                        each.dish?.id === dish.id
                          ? " border-primary"
                          : "border-transparent"
                      }  flex flex-wrap border p-2 text-center sm:w-32`}
                    >
                      <input
                        type="radio"
                        name={`${each.date.toString()} dish`}
                        className="sm:hidden"
                        id={`${each.date.toString()} ${dish.name}`}
                        checked={each.dish?.id === dish.id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMealSelection(
                              {
                                date: each.date,
                                dish,
                                protein: null,
                                skip: false,
                              },
                              "main"
                            );
                          }
                        }}
                      />
                      <label
                        className=" ml-2 block sm:ml-0"
                        htmlFor={`${each.date.toString()} ${dish.name}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="hidden sm:block"
                          src={dish.image}
                          alt={dish.name}
                        />
                        <p className="inline-block">{dish.name}</p>
                        <p className="badge-primary badge inline-block ">
                          {dish.type}
                        </p>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-2">
                <SubHeading title="Select Protein - $2.79" />
                <div className="sm:flex sm:flex-wrap sm:justify-center sm:gap-2 sm:overflow-scroll">
                  {proteins.map((protein) => (
                    <div
                      key={protein.id}
                      className={`${
                        each.protein?.id === protein.id
                          ? " border-primary"
                          : "border-transparent"
                      } flex border p-2 text-center sm:w-32`}
                    >
                      <input
                        type="radio"
                        name={`${each.date.toString()} protein`}
                        className="sm:hidden"
                        id={`${each.date.toString()} ${protein.name}`}
                        checked={each.protein?.id === protein.id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMealSelection(
                              {
                                date: each.date,
                                dish: null,
                                protein,
                                skip: false,
                              },
                              "protein"
                            );
                          }
                        }}
                      />
                      <label
                        className="ml-2 capitalize"
                        htmlFor={`${each.date.toString()} ${protein.name}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="hidden sm:block"
                          src={protein.image}
                          alt={protein.name}
                        />
                        <p className="inline-block sm:block">{protein.name}</p>
                        {/* <p className="badge-primary badge">{each.type}</p> */}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
