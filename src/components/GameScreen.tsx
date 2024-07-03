import React, { useEffect, useState } from "react";
import GameEndModal from "./GameEndModal";
import { card } from "../app/types";
import { getCards } from "@/api/api";

interface GameScreenProps {
  houseCards: card[];
  userCards: card[];
  deckId: string;
  setUserCards: (userCards: any) => void;
  handleStartGame: () => void;
  gameEnded: boolean;
  setGameEnded: (gameEnded: boolean) => void;
}

const GameScreen = ({
  houseCards,
  userCards,
  deckId,
  setUserCards,
  handleStartGame,
  gameEnded,
  setGameEnded,
}: GameScreenProps) => {
  const [userScore, setUserScore] = useState(0);
  const [houseScore, setHouseScore] = useState(0);
  const [gameEndMessage, setGameEndMessage] = useState("");

  const checkWin = () => {
    let message;

    if (houseScore === 21) {
      message = "Sorry, House wins!";
    } else if (userScore === 21 || (userScore < 21 && userScore > houseScore)) {
      message = "Congratulations 🎉 You win!";
    } else {
      message = "Sorry 😢 House wins!";
    }

    setGameEndMessage(message);

    setGameEnded(true);
  };

  useEffect(() => {
    calculateScores(userCards, setUserScore);
  }, [userCards]);

  useEffect(() => {
    if (userScore >= 21 || houseScore == 21) {
      checkWin();
    }
  }, [userScore]);

  useEffect(() => {
    calculateScores(houseCards, setHouseScore);
  }, [houseCards]);

  const calculateScores = (
    cards: card[],
    setScore: (score: number) => void
  ) => {
    let total = 0;
    cards.forEach((card: any) => {
      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        total += 10;
      } else if (card.value !== "ACE") {
        total += Number(card.value);
      }
    });
    const aces = cards.filter((card: any) => {
      return card.value === "ACE";
    });
    aces.forEach(() => {
      if (total + 11 > 21) {
        total += 1;
      } else if (total + 11 === 21) {
        if (aces.length > 1) {
          total += 1;
        } else {
          total += 11;
        }
      } else {
        total += 11;
      }
    });
    setScore(total);
  };

  const drawUserCard = async () => {
    const data = await getCards(deckId, 1);
    setUserCards((prev: card[]) => [...prev, data.cards[0]]);
  };

  return (
    <div className="relative h-screen w-full p-10">
      <img
        src="bg.jpg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative h-full flex flex-col items-center bg-opacity-50">
        <div className="w-full grid lg:grid-cols-2 gap-2 lg:gap-0 my-20">
          <div className="flex flex-col mx-auto space-y-10 bg-white rounded-xl p-10">
            <div className="font-semibold text-2xl text-center text-emerald-500">
              House : {houseScore}
            </div>
            <div className="flex flex-row space-x-2 items-center justify-evenly w-full">
              {houseCards.map((houseCard) => (
                <img
                  key={houseCard.code}
                  className="lg:w-32 w-16"
                  src={houseCard.image}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col mx-auto space-y-10 bg-white rounded-xl p-10 max-w-xs lg:max-w-full">
            <div className="font-semibold text-2xl text-center text-red-500">
              You : {userScore}
            </div>
            <div className="flex overflow-x-auto flex-row space-x-2 items-center justify-evenly w-full">
              {userCards.map((userCard) => (
                <img
                  key={userCard.code}
                  className="lg:w-32 w-16"
                  src={userCard.image}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-around mx-auto w-2/3 lg:w-1/3">
          <button
            disabled={gameEnded}
            onClick={() => {
              drawUserCard();
            }}
            className={`text-white lg:w-40 w-20 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 ${
              gameEnded ? " cursor-not-allowed" : "hover:bg-gradient-to-br"
            } focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 font-semibold rounded-lg text-lg lg:px-10 py-4 text-center mb-2`}
          >
            Hit
          </button>
          <button
            disabled={gameEnded}
            onClick={() => {
              checkWin();
            }}
            className={`text-white lg:w-40 w-20 bg-gradient-to-r from-red-400 via-red-500 to-red-600 ${
              gameEnded ? "cursor-not-allowed " : "hover:bg-gradient-to-br"
            } focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-lg lg:px-10 py-4 text-center mb-2`}
          >
            Stand
          </button>
        </div>
      </div>
      <GameEndModal
        openModal={gameEnded}
        gameEndMessage={gameEndMessage}
        handleStartGame={handleStartGame}
      />
    </div>
  );
};

export default GameScreen;
