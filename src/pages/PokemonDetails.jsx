import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';
import Loading from '../components/Loading';
import EvolutionChain from '../components/EvolutionChain';

const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null)
  let { name } = useParams()


  useEffect(() => {
    const getPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        setPokemonDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching Pokémon details');
        setIsLoading(false);
      }
    };

    getPokemonDetails();
  }, [name]);

  const formatStatName = (statName) => {
    return statName.replace('-', ' ');
  }

  const renderStats = () => {
    return pokemonDetails.stats.map((stat) => (
      <div key={stat.stat.name} className="flex flex-col  items-start gap-1 mb-3">
        <div className="text-xl uppercase">
          <p>{formatStatName(stat.stat.name)}</p>
        </div>
        <div className="w-full mb-1">
          <ProgressBar value={stat.base_stat} maxValue={255} />
        </div>
      </div>
    ));
  };

  const getTypeColor = (type) => {
    const typeColors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
      unknown: '#68A090',
      shadow: '#604E78',
    };

    return typeColors[type] || '#000000';
  };

  const renderAbilities = () => {

    return pokemonDetails.abilities.map((ability) => (
      <div key={ability.ability.name} className="flex items-center mb-2">
        <p className='px-4 py-1 rounded-lg text-white sm:text-lg uppercase bg-teal-600' >{ability.ability.name}</p>
      </div>
    ));
  };

  


  if(error){
    return <p>{error}</p>
  }

  if(isLoading){
    return <Loading />
  }

  return (
    <div>
 
     { pokemonDetails && (
        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <div className="flex justify-end gap-2 items-center mb-4">
            {pokemonDetails.types.map((type) => (
              <div
                key={type.type.name}
                className="px-4 py-1 rounded-lg text-white  uppercase"
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src={pokemonDetails.sprites.other['official-artwork'].front_default}
              alt={pokemonDetails.name}
              className="max-w-full mb-4"
            />
            <h1 className="text-4xl font-medium mb-4 uppercase">- {pokemonDetails.name} -</h1>
          </div>
          <p className='text-lg text-center'>
            Height: {pokemonDetails.height / 10} m | Weight: {pokemonDetails.weight / 10} kg
          </p>
          
          <h2 className="text-2xl font-medium mt-6 mb-2">Abilities:</h2>
          <div className='flex justify-start flex-wrap  items-center gap-1'>
            {renderAbilities()}
          </div>
          <h2 className="text-2xl font-medium mt-6 mb-2">Base Stats:</h2>
          {renderStats()}
          <h2 className="text-2xl font-medium mt-6 mb-2">Evolution Chain:</h2>
          <EvolutionChain pokemonName={pokemonDetails.name} />
        </div>
      )}
  </div>
  
  )
}
export default PokemonDetails