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
    <div>
      <div>
        <div className="w-full grid grid-cols-2 my-20">
          <div className="w-full flex flex-col mx-auto space-y-10">
            <div className="font-semibold text-xl text-center">
              House : {houseScore}
            </div>
            <div className="flex flex-row space-x-2 items-center justify-evenly w-full">
              {houseCards.map((houseCard) => (
                <img
                  key={houseCard.code}
                  className="w-32"
                  src={houseCard.image}
                />
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col mx-auto space-y-10">
            <div className="font-semibold text-xl text-center">
              You : {userScore}
            </div>
            <div className="flex overflow-x-auto flex-row space-x-2 items-center justify-evenly w-full">
              {userCards.map((userCard) => (
                <img
                  key={userCard.code}
                  className="w-32"
                  src={userCard.image}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 mx-auto flex flex-row items-center justify-around">
          <button
            disabled={gameEnded}
            onClick={() => {
              drawUserCard();
            }}
            className={`text-white w-40 bg-gradient-to-r from-green-400 via-green-500 to-green-600 ${
              gameEnded ? " cursor-not-allowed" : "hover:bg-gradient-to-br"
            } focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-semibold rounded-lg text-lg px-10 py-4 text-center me-2 mb-2`}
          >
            Hit
          </button>
          <button
            disabled={gameEnded}
            onClick={() => {
              checkWin();
            }}
            className={`text-white w-40 bg-gradient-to-r from-red-400 via-red-500 to-red-600 ${
              gameEnded ? "cursor-not-allowed " : "hover:bg-gradient-to-br"
            } focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-lg px-10 py-4 text-center me-2 mb-2`}
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
