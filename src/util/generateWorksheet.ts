import random from "lodash/random";
import { evaluate } from "mathjs";

export default function generateWorksheet(
  settings: IAdditionWorksheetSettings
) {
  const worksheetItems: IAdditionWorksheetItem[] = [];
  for (let i = 0; i < settings.numberOfItems; i++) {
    let operands: number[] = [];
    // Generate Operand
    for (let j = 0; j < settings.numberOfOperands; j++) {
      const numberOfDigits = random(
        settings.numberOfDigits.min,
        settings.numberOfDigits.max
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
      // Parse the number string and add to operands list
      operands.push(parseInt(numberString));
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
