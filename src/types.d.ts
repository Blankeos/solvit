interface IAdditionWorksheetSettings {
  numberOfDigits: {
    min: number;
    max: number;
  };
  numberOfItems: number;
  numberOfOperands: number;
}

interface IAdditionWorksheetItem {
  operands: number[]; // default 2
  correctAnswer: number;
}
