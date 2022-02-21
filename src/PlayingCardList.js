import { useState, useRef } from "react";
import {v4 as uuid} from "uuid";
import axios from "axios";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
const CardTable = () => {
  const [deck, setCards] = useState([]);
  const deckIDRef = useRef();

  useEffect( () => {
    async function getDeck() {
        const response = await axios.get('http://deckofcardsapi.com/api/deck/new/');
        const { deck_id } = response.data;
        
        deckIDRef.current = deck_id;
    }

    getDeck();
}, [])
  
  const addCard = async () => {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckIDRef.current}/draw/?count=1`
    );

    const { cards } = response.data;
    setCards([...deck, { ...cards, id: uuid() }]);
  };
  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {deck.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.deck[0].image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
