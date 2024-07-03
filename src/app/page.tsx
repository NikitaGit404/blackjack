"use client";
import { useEffect, useRef, useState } from "react";
import { card, newDeckResp } from "./types";
import GameScreen from "../components/GameScreen";
import StartNewButton from "../components/StartNewButton";
import { getCards, initializeNewDeck, shuffleDeck } from "@/api/api";

export default function Home() {
  const [deckId, setDeckId] = useState("");
  const [userCards, setUserCards] = useState<card[]>([]);
  const [houseCards, setHouseCards] = useState<card[]>([]);
  const [gameEnded, setGameEnded] = useState(false);
  const isFirstRender = useRef(true);
  const getNewDeckAndShuffle = async () => {
    const data: newDeckResp = await initializeNewDeck();
    setDeckId(data.deck_id);
    await shuffleDeck(data.deck_id);
  };

  useEffect(() => {
    if (isFirstRender.current || gameEnded) {
      getNewDeckAndShuffle();
      isFirstRender.current = false;
    }
  }, [gameEnded]);

  const dealCards = async () => {
    setGameEnded(false);
    const data = await getCards(deckId, 4);
    setHouseCards(data.cards.slice(0, 2));
    setUserCards(data.cards.slice(2, 4));
  };

  return (
    <main className="min-h-screen w-screen">
      {houseCards.length > 0 && userCards.length > 0 ? (
        <GameScreen
          houseCards={houseCards}
          userCards={userCards}
          deckId={deckId}
          setUserCards={setUserCards}
          handleStartGame={dealCards}
          gameEnded={gameEnded}
          setGameEnded={setGameEnded}
        />
      ) : (
        // <div className="min-h-screen flex flex-col items-center">
        //   <div className="text-7xl font-semibold text-blue-500 mt-32 mb-16">
        //     BlackJack
        //   </div>
        //   <div className="my-5">
        //     Click on Deal button to get a new shuffled deck and distribute 2
        //     cards each.
        //   </div>
        //   <StartNewButton handleStartGame={dealCards} buttonText={"Deal"} />
        // </div>
        <div className="relative h-screen w-full">
          <img
            src="bg.jpg"
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative h-screen flex items-center bg-opacity-50">
            <div className="lg:w-1/3 w-3/4 h-auto lg:h-auto p-10 bg-white border border-gray-200 rounded-lg shadow mx-auto flex flex-col items-center">
              <span className="lg:text-7xl text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-emerald-500 mb-4">
                BlackJack
              </span>
              <div className="mb-6 font-light text-sm text-gray-700 text-center">
                Click on Deal button to get a new shuffled deck and distribute 2
                cards each.
              </div>
              <StartNewButton handleStartGame={dealCards} buttonText={"Deal"} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
