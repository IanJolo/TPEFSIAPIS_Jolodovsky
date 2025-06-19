import axios from "axios";
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [listaPokemon, setListaPokemon] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const baseURL = "https://pokeapi.co/api/v2/pokemon?limit=20";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setListaPokemon(response.data.results); 
    });
  }, []);

  const mostrarDetalles = (urlPokemon) => {
    axios.get(urlPokemon).then((response) => {
      setPokemon(response.data);
    });
  };

  return (
    <div>
      <h1>Lista de Pokemones</h1>
      {listaPokemon.map((pokemon) => (
        <button key={pokemon.name} onClick={() => mostrarDetalles(pokemon.url)}>
          {pokemon.name}
        </button>
      ))}

      {pokemon && (
        <div className="pokemon-detalles">
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default}/>
          <h3>Habilidades:</h3>
          {pokemon.abilities.map((obj, index) => (
            <p key={index}>{obj.ability.name}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
