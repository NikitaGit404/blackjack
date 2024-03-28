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
        className="px-10 py-3.5 text-base font-medium text-white w-max bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default StartNewButton;
