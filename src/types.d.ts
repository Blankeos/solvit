interface IWorksheetSettings {
  numberOfDigits: number[];
  numberOfItems: number;
  numberOfOperands: number;
  operations: ("+" | "-" | "*" | "/")[];
  negative: {
    containNegatives: boolean;
    chance: number;
  };
}

interface IWorksheetItem {
  operands: string[];
  correctAnswer: number;
}
