import { useState, useEffect, useRef } from "react";
import {v4 as uuid} from "uuid";
import axios from "axios";

const useAxios = () => {
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
    await axios.get(`http://deckofcardsapi.com/api/deck/${deckIDRef.current}/shuffle/`);

    const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckIDRef.current}/draw/?count=1`
    );

    const { image } = response.data.cards[0];

    setCards([...deck, { image, id: uuid() }]);
    };

    return [deck, addCard];

}

export default useAxios;