import { useState } from "react";
import pokemonList from "./pokemonList";
import Choice from "./helpers";

/* Select element to choose from common pokemon. */
const PokemonSelect = ({ add, pokemon = pokemonList }) => {
  const [pokeIdx, setPokeIdx] = useState(0);
  const handleChange = evt => {
    setPokeIdx(evt.target.value);
  };

  return (
    <div>
      <select onChange={handleChange}>
        {pokemon.map((p, idx) => (
          <option key={idx} value={idx}>
            {p}
          </option>
        ))}
      </select>
      <button onClick={() => add(pokemon[pokeIdx])}>Catch one!</button>
      <button onClick={() => add(Choice(pokemon))}>I'm feeling lucky</button>
    </div>
  );
}

export default PokemonSelect;
