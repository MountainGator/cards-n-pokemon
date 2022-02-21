import { useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

const usePokeAxios = () => {
    const [pokemon, setPokemon] = useState([]);

    const addPokemon = async name => {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}/`
        );
        setPokemon(pokemon => [...pokemon, { ...response.data, id: uuid() }]);
    };

    return [pokemon, addPokemon];
}

export default usePokeAxios;