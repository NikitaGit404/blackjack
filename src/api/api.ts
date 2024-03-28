const BASE_URL = 'https://deckofcardsapi.com/api/deck';

export const initializeNewDeck = async () => {
  try {
    const response = await fetch(`${BASE_URL}/new/`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  } catch (error) {
    console.error('Error in initializing a new deck:', error);
  }
};

export const shuffleDeck = async (deck_id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${deck_id}/shuffle/`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  } catch (error) {
    console.error('Error in shuffling the deck:', error);
  }
};

export const getCards = async (deckId: string, count: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${deckId}/draw/?count=${count}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  } catch (error) {
    console.error('Error in getting cards:', error);
  }
};
