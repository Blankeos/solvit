import random from "lodash/random";
import math, { evaluate } from "mathjs";

export default function generateWorksheet(settings: IWorksheetSettings) {
  const worksheetItems: IWorksheetItem[] = [];
  for (let i = 0; i < settings.numberOfItems; i++) {
    let operands: string[] = [];
    // Generate Operand
    for (let j = 0; j < settings.numberOfOperands; j++) {
      const numberOfDigits = random(
        settings.numberOfDigits[0],
        settings.numberOfDigits[1]
      );
      let numberString: string = "";
      // Generate Digit and concatenate in one number
      for (let k = 0; k < numberOfDigits; k++) {
        if (k === 0) {
          numberString += random(1, 9);
        } else {
          numberString += random(0, 9);
        }
      }

      // Negative Randomizer
      if (settings.negative.containNegatives) {
        let randomFloat = random(0, 1, true);
        if (randomFloat <= settings.negative.chance) {
          numberString = `(-${numberString})`;
        }
      }

      // Parse the number string and add to operands list
      operands.push(numberString);
    }

    // Equation Parser
    // Generate the expression
    let expression = "";
    for (let j = 0; j < operands.length; j++) {
      expression += operands[j];
      if (j < operands.length - 1) expression += "+";
    }
    const correctAnswer = evaluate(expression);

    worksheetItems.push({
      operands: operands,
      correctAnswer: correctAnswer,
    });
  }
  return worksheetItems;
}
