import { useState, useEffect } from 'react';
import axios from 'axios';
import PokeCard from '../components/PokeCard';
import {matchSorter} from 'match-sorter'
import Loading from '../components/Loading';


const Home = () => {


    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visiblePokemon, setVisiblePokemon] = useState(20);
    const [searchVal,setSearchVal] = useState('');

    let filterData = matchSorter(pokemonList, searchVal , {keys: ['name'],sorter: rankedItems => rankedItems,   threshold: matchSorter.rankings.STARTS_WITH });


    useEffect(() => {
        fetchPokemon();
    }, []);



    const fetchPokemon = async () => {
        try {
        const response = await axios.get(
            'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
        );
        setPokemonList(response.data.results);
        setIsLoading(false);
        } catch (error) {
        setError('Error fetching Pokémon');
        setIsLoading(false);
        }
    };

    const fetchPokemonDetails = async (url) => {
        try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
        } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        }
    };
    
    useEffect(() => {
        const fetchDetails = async () => {
        const details = await Promise.all(
            filterData.slice(0, visiblePokemon).map((pokemon) =>
            fetchPokemonDetails(pokemon.url)
            )
        );
        setPokemonDetails(details);
        };

        fetchDetails();
    }, [searchVal,pokemonList, visiblePokemon]);

    const loadMorePokemon = () => {
        setVisiblePokemon((prevCount) => prevCount + 20);
    };

    const typeColors = [
        { type: 'normal', bgColor: '#A8A878' },
        { type: 'fire', bgColor: '#F08030' },
        { type: 'water', bgColor: '#6890F0' },
        { type: 'grass', bgColor: '#78C850' },
        { type: 'electric', bgColor: '#F8D030' },
        { type: 'ice', bgColor: '#98D8D8' },
        { type: 'fighting', bgColor: '#C03028' },
        { type: 'poison', bgColor: '#A040A0' },
        { type: 'ground', bgColor: '#E0C068' },
        { type: 'flying', bgColor: '#A890F0' },
        { type: 'psychic', bgColor: '#F85888' },
        { type: 'bug', bgColor: '#A8B820' },
        { type: 'rock', bgColor: '#B8A038' },
        { type: 'ghost', bgColor: '#705898' },
        { type: 'dragon', bgColor: '#7038F8' },
        { type: 'dark', bgColor: '#705848' },
        { type: 'steel', bgColor: '#B8B8D0' },
        { type: 'fairy', bgColor: '#EE99AC' },
        { type: 'unknown', bgColor: '#68A090' },
        { type: 'shadow', bgColor: '#604E78' },
      ];
      

      if(error){
        return <p>{error}</p>
      }
 
      if(isLoading){
        return <Loading />
      }
      
    

  return (
    <div className='flex flex-col' >
         <h1 className="text-2xl font-medium my-4 text-center">Pokémon List</h1>
    
            <>
            <form className="flex items-center">   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full mb-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                        <input type="text" id="simple-search" onChange={(e)=>setSearchVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Search" />
                    </div>

            </form>
            
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    
                    {filterData.slice(0, visiblePokemon).map((pokemon, index) => {

                        const types = pokemonDetails[index]?.types.map(
                            (type) => type.type.name
                        );


                        const pokemonTypeColors = types?.map((type) =>
                            typeColors.find((color) => color.type === type)
                        );
                    
                    return (
                        <PokeCard key={pokemon.name} pokemon={pokemon} pokemonTypeColors={pokemonTypeColors} index={index} />
                    );
                    })}
                </div>
            </>
      
        {visiblePokemon < filterData.length && (
          <button
            className="bg-blue-500 mx-auto text-white text-2xl px-4 py-2 mt-4 rounded"
            onClick={loadMorePokemon} disabled={isLoading}
          >
            Load More
          </button>
        )}
    
    </div>
  )
}
export default Home