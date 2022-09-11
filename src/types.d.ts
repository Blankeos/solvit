interface IWorksheetSettings {
  numberOfDigits: number[];
  numberOfItems: number;
  numberOfOperands: number;
  operations: OperatorType[];
  negative: {
    containNegatives: boolean;
    chance: number;
  };
}

interface IWorksheetItem {
  expression: string;
  correctAnswer: number;
}

type OperatorType = "+" | "-" | "*" | "/";
