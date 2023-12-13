import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

interface ClibBoardBoxProps {
  title?: string;
  text: string;
  setCliped?: Dispatch<SetStateAction<boolean>>;
}

export function cliptext(text: string) {
  return navigator.clipboard.writeText(text);
}

const ClibBoardBox: React.FC<ClibBoardBoxProps> = ({ title, text, setCliped }) => {
  const [cliped, setClipedState] = useState(false);

  const handleCopyClick = async () => {
    try {
      await cliptext(text);
      setClipedState(true);
      if (setCliped) setCliped(true);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  useEffect(() => {
    if (cliped) {
      const timeoutId = setTimeout(() => {
        setClipedState(false);
        if (setCliped) setCliped(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [cliped, setCliped]);

  return (
    <div className="rounded flex border-gray-500 corsec border items-center" style={{ cursor: "pointer" }} onClick={handleCopyClick}>
      <div className="border-gray-500 rounded border p-3">
        {cliped ? (
          <i className="bx bx-check" />
        ) : (
          <i className="bx bx-copy-alt" />
        )}
      </div>
      {cliped ? (
        <span className="ml-2 font-bold">Copiado com sucesso</span>
      ) : (
        <span className="ml-2 font-bold">{title ?? ((text.substring(0, 35) + "........."))}</span>
      )}
    </div>
  );
};

export default ClibBoardBox;
