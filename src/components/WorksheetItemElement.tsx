import { useEffect, useState } from "react";

interface IWorksheetItemElementProps {
  nth: number;
  worksheetItem: IWorksheetItem;
}

const WorksheetItemElement: React.FC<IWorksheetItemElementProps> = ({
  nth,
  worksheetItem,
}) => {
  const [answerVisible, setAnswerVisible] = useState<boolean>(false);
  useEffect(() => {
    setAnswerVisible(false);
  }, [worksheetItem]);
  return (
    <div className="flex">
      <span className="w-8 inline-block">{nth})</span>
      {worksheetItem.expression}=<span className="flex-auto"></span>
      <button
        onClick={() => {
          setAnswerVisible(!answerVisible);
        }}
        className={`px-2 w-20 text-xs flex items-center justify-center rounded ${
          answerVisible ? "" : "bg-gray-200"
        }`}
      >
        {!answerVisible && <span className="select-none">answer</span>}
        {answerVisible && (
          <span className="text-base">{worksheetItem.correctAnswer}</span>
        )}
      </button>
    </div>
  );
};

export default WorksheetItemElement;
