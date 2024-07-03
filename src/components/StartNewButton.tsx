import React from "react";

interface StartNewButtonProps {
  handleStartGame: () => void;
  buttonText: string;
}
const StartNewButton = ({
  handleStartGame,
  buttonText,
}: StartNewButtonProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={handleStartGame}
        className="px-10 py-3.5 text-lg font-semibold text-white w-max bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 rounded-lg text-center"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default StartNewButton;
