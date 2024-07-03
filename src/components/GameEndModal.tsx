import React from "react";
import StartNewButton from "./StartNewButton";

interface GameEndModalProps {
  openModal: boolean;
  gameEndMessage: string;
  handleStartGame: () => void;
}
const GameEndModal = ({
  openModal,
  gameEndMessage,
  handleStartGame,
}: GameEndModalProps) => {
  return (
    <>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-gray-200 px-5 py-10 rounded-lg shadow z-10 flex flex-col items-center lg:w-1/3 w-2/3">
            <h3 className="mb-8 text-lg font-normal text-gray-500">
              {gameEndMessage}
            </h3>
            <StartNewButton
              handleStartGame={handleStartGame}
              buttonText={"Start Over"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GameEndModal;
