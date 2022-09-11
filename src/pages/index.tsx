import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useReducer, useState } from "react";
import generateWorksheet from "@/util/generateWorksheet";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import produce from "immer";
import Counter from "@/components/Counter";
import WorksheetItemElement from "@/components/WorksheetItemElement";
import { TbArrowsRandom as RandomIcon } from "react-icons/tb";
import Range from "@/components/Range";
import Link from "next/link";
import Checkbox from "@/components/Checkbox";
import Tippy from "@tippyjs/react";
type ActionTypes =
  | {
      type: "SET_NUMBER_OF_DIGITS";
      payload: number[];
    }
  | {
      type: "SET_NUMBER_OF_OPERANDS";
      payload: number;
    }
  | {
      type: "SET_NUMBER_OF_ITEMS";
      payload: number;
    }
  | {
      type: "SET_OPERATION";
      payload: {
        operation: "+" | "-" | "*" | "/";
        addOrRemove: "add" | "remove";
      };
    }
  | {
      type: "SET_CONTAIN_NEGATIVES";
      payload: boolean;
    }
  | {
      type: "SET_NEGATIVE_CHANCE";
      payload: number;
    };

const reducer = produce((draft: IWorksheetSettings, action: ActionTypes) => {
  switch (action.type) {
    case "SET_NUMBER_OF_DIGITS":
      draft.numberOfDigits = action.payload;
      break;
    case "SET_NUMBER_OF_OPERANDS":
      draft.numberOfOperands = action.payload;
      break;
    case "SET_NUMBER_OF_ITEMS":
      draft.numberOfItems = action.payload;
      break;
    case "SET_OPERATION":
      if (action.payload.addOrRemove === "add") {
        if (
          draft.operators.findIndex((op) => op === action.payload.operation) ===
          -1
        ) {
          draft.operators.push(action.payload.operation);
        }
      }

      if (action.payload.addOrRemove === "remove") {
        const index = draft.operators.findIndex(
          (op) => op === action.payload.operation
        );
        if (index !== -1) draft.operators.splice(index, 1);
      }

      // Preventive measures for empty operators
      // if operators become empty after every action, add a default: "+"
      if (draft.operators.length === 0) draft.operators.push("+");
      break;
    case "SET_CONTAIN_NEGATIVES":
      draft.negative.containNegatives = action.payload;
      break;
    case "SET_NEGATIVE_CHANCE":
      draft.negative.chance = action.payload;
      break;
    default:
  }
});

const initialWorksheetSettings: IWorksheetSettings = {
  numberOfDigits: [1, 2],
  numberOfItems: 15,
  numberOfOperands: 2,
  negative: {
    containNegatives: false,
    chance: 0.1,
  },
  operators: ["+"],
};
const Home: NextPage = () => {
  const [worksheetSettings, dispatch] = useReducer(
    reducer,
    initialWorksheetSettings
  );
  const [additionWorksheetItems, setAdditionWorksheetItems] = useState<
    IWorksheetItem[]
  >([
    {
      expression: "1+1",
      correctAnswer: 2,
    },
  ]);

  useEffect(() => {
    handleGenerateWorksheet();
  }, [worksheetSettings]);

  function handleGenerateWorksheet() {
    setAdditionWorksheetItems(generateWorksheet(worksheetSettings));
  }

  function handleOperatorsChange(checked: boolean, operator: OperatorType) {
    dispatch({
      type: "SET_OPERATION",
      payload: {
        addOrRemove: checked ? "add" : "remove",
        operation: operator,
      },
    });
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Head>
        <title>Solvit - by Carlo Taleon</title>
        <meta
          name="description"
          content="Create randomly generated math worksheets to practice arithmetic fast! A deliberate math practice tool."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow">
        <div className="max-w-md mx-auto w-full">
          <div className="flex flex-col px-5">
            <header className="my-5">
              <h1 className="text-indigo-600 text-center font-bold text-xl">
                Solvit
              </h1>
              <p className="text-gray-400 text-xs text-center">
                🧮 Deliberate Math Practice Trainer. Create randomly generated
                math worksheets to practice arithmetic fast!
              </p>
            </header>
            {/* Settings */}
            <div className="p-5 bg-gray-50 border rounded-xl text-sm flex flex-col gap-y-3">
              <h2 className="text-sm font-semibold mb-1 text-gray-800">
                Worksheet Randomizer Settings
              </h2>
              <div className="flex flex-col gap-y-1">
                <h3 className="font-medium">Number of digits</h3>
                <div className="border flex items-center p-2 px-5 gap-x-5 rounded-full bg-white">
                  <span className="w-5 text-center">
                    {Math.min(...worksheetSettings.numberOfDigits)}
                  </span>
                  <Range
                    values={worksheetSettings.numberOfDigits}
                    defaultValues={[2, 3]}
                    min={1}
                    max={5}
                    step={1}
                    onChange={(values) => {
                      // Prevent unnecessary re-rendering
                      if (
                        values[0] === worksheetSettings.numberOfDigits[0] &&
                        values[1] === worksheetSettings.numberOfDigits[1]
                      )
                        return;
                      dispatch({
                        type: "SET_NUMBER_OF_DIGITS",
                        payload: values,
                      });
                    }}
                  />
                  <span className="w-5 text-center">
                    {Math.max(...worksheetSettings.numberOfDigits)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="font-medium">Number of operands</h3>
                <Counter
                  defaultValue={2}
                  min={2}
                  max={4}
                  onChange={(value) => {
                    dispatch({
                      type: "SET_NUMBER_OF_OPERANDS",
                      payload: value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="font-medium">Number of items</h3>
                <Counter
                  defaultValue={15}
                  min={1}
                  max={50}
                  onChange={(value) => {
                    dispatch({
                      type: "SET_NUMBER_OF_ITEMS",
                      payload: value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="font-medium">Contain negatives</h3>
                <div className="flex gap-x-4 items-center">
                  <Checkbox
                    checked={worksheetSettings.negative.containNegatives}
                    htmlFor="contain-negatives-checkbox"
                    onChange={(checked) => {
                      dispatch({
                        type: "SET_CONTAIN_NEGATIVES",
                        payload: checked,
                      });
                    }}
                  />
                  {worksheetSettings.negative.containNegatives && (
                    <>
                      <span className="w-5 mr-2">
                        {worksheetSettings.negative.chance * 100}%
                      </span>
                      <Range
                        values={[worksheetSettings.negative.chance]}
                        defaultValues={[0.1]}
                        min={0.1}
                        max={1}
                        step={0.1}
                        onChange={(values) => {
                          dispatch({
                            type: "SET_NEGATIVE_CHANCE",
                            payload: values[0],
                          });
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="font-medium">Operators</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="flex gap-x-2 items-center">
                    <Tippy
                      content={
                        <span className="text-xs">
                          ✔ other items before unchecking 'Add'.
                        </span>
                      }
                      placement="top-end"
                      disabled={
                        !(
                          worksheetSettings.operators.length === 1 &&
                          worksheetSettings.operators.includes("+")
                        )
                      }
                    >
                      <span>
                        <Checkbox
                          disabled={
                            worksheetSettings.operators.length === 1 &&
                            worksheetSettings.operators.includes("+")
                          }
                          checked={worksheetSettings.operators.includes("+")}
                          htmlFor="checkbox-operation-add"
                          onChange={(checked) => {
                            dispatch({
                              type: "SET_OPERATION",
                              payload: {
                                addOrRemove: checked ? "add" : "remove",
                                operation: "+",
                              },
                            });
                          }}
                        />
                      </span>
                    </Tippy>
                    <label
                      className="text-gray-600"
                      htmlFor="checkbox-operation-add"
                    >
                      Add
                    </label>
                  </div>

                  <div className="flex gap-x-2 items-center">
                    <Checkbox
                      checked={worksheetSettings.operators.includes("-")}
                      htmlFor="checkbox-operation-subtract"
                      onChange={(checked) => {
                        dispatch({
                          type: "SET_OPERATION",
                          payload: {
                            addOrRemove: checked ? "add" : "remove",
                            operation: "-",
                          },
                        });
                      }}
                    />
                    <label
                      className="text-gray-600"
                      htmlFor="checkbox-operation-subtract"
                    >
                      Subtract
                    </label>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <Checkbox
                      checked={worksheetSettings.operators.includes("*")}
                      htmlFor="checkbox-operation-multiply"
                      onChange={(checked) => {
                        dispatch({
                          type: "SET_OPERATION",
                          payload: {
                            addOrRemove: checked ? "add" : "remove",
                            operation: "*",
                          },
                        });
                      }}
                    />
                    <label
                      className="text-gray-600"
                      htmlFor="checkbox-operation-multiply"
                    >
                      Multiply
                    </label>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <Checkbox
                      checked={worksheetSettings.operators.includes("/")}
                      htmlFor="checkbox-operation-divide"
                      onChange={(checked) => {
                        dispatch({
                          type: "SET_OPERATION",
                          payload: {
                            addOrRemove: checked ? "add" : "remove",
                            operation: "/",
                          },
                        });
                      }}
                    />
                    <label
                      className="text-gray-600"
                      htmlFor="checkbox-operation-divide"
                    >
                      Divide
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Worksheet */}
            <div className="mt-8 text-gray-600 flex flex-col gap-y-0.5">
              {additionWorksheetItems.map((worksheetItem, i) => (
                <WorksheetItemElement
                  key={i}
                  nth={i + 1}
                  worksheetItem={worksheetItem}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-indigo-500 mt-10">
        <div className="py-10 max-w-md mx-auto w-full text-center text-white text-sm">
          2022 ©{" "}
          <Link href="https://carlo.vercel.app/">
            <a className="hover:text-indigo-200">Carlo Taleon</a>
          </Link>
          . All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
