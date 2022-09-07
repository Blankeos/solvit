import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import generateWorksheet from "@/util/generateWorksheet";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import produce from "immer";
import Counter from "@/components/Counter";
import WorksheetItemElement from "@/components/WorksheetItemElement";
import { TbArrowsRandom as RandomIcon } from "react-icons/tb";
const Home: NextPage = () => {
  const [additionWorksheetSettings, setAdditionWorksheetSettings] =
    useState<IAdditionWorksheetSettings>({
      numberOfDigits: {
        min: 2,
        max: 2,
      },
      numberOfItems: 15,
      numberOfOperands: 3,
    });
  const [additionWorksheetItems, setAdditionWorksheetItems] = useState<
    IAdditionWorksheetItem[]
  >([
    {
      operands: [1, 2],
      correctAnswer: 3,
    },
  ]);

  function setNumberOfOperands(
    additionWorkSheetSettings: IAdditionWorksheetSettings,
    numberOfOperands: number
  ) {
    return produce(additionWorkSheetSettings, (draft) => {
      draft.numberOfOperands = numberOfOperands;
    });
  }
  function setNumberOfDigits(
    additionWorkSheetSettings: IAdditionWorksheetSettings,
    minMax: number[]
  ) {
    return produce(additionWorkSheetSettings, (draft) => {
      draft.numberOfDigits = {
        min: minMax[0],
        max: minMax[1],
      };
    });
  }
  useEffect(() => {
    handleGenerateWorksheet();
  }, [additionWorksheetSettings]);

  function handleGenerateWorksheet() {
    setAdditionWorksheetItems(generateWorksheet(additionWorksheetSettings));
  }
  return (
    <div>
      <Head>
        <title>Solvit - Deliberate Math Practice Trainer!</title>
        <meta
          name="description"
          content="Create randomly generated math worksheets to practice arithmetic fast!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
            <div className="p-5 bg-gray-50 border rounded-xl text-sm flex flex-col gap-y-2">
              <h2 className="text font-semibold mb-1 text-gray-800">
                Worksheet Settings
              </h2>
              <div className="">
                <h3>Number of digits</h3>
                <div className="flex items-center">
                  <Slider
                    range
                    allowCross={false}
                    defaultValue={[
                      additionWorksheetSettings.numberOfDigits.min,
                      additionWorksheetSettings.numberOfDigits.max,
                    ]}
                    min={1}
                    max={5}
                    onChange={(values) => {
                      if (Array.isArray(values)) {
                        setAdditionWorksheetSettings(
                          setNumberOfDigits(additionWorksheetSettings, values)
                        );
                      }
                    }}
                  />
                </div>
              </div>
              <h3>Number of operands</h3>
              <Counter
                defaultValue={2}
                min={2}
                max={4}
                onChange={(value) => {
                  setAdditionWorksheetSettings(
                    setNumberOfOperands(additionWorksheetSettings, value)
                  );
                }}
              />
              <button
                className="flex items-center justify-center gap-x-1 bg-indigo-600 rounded px-3 py-2 text-white"
                onClick={handleGenerateWorksheet}
              >
                <RandomIcon />
                <span>Generate Worksheet</span>
              </button>
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

      <footer>Footer</footer>
    </div>
  );
};

export default Home;
