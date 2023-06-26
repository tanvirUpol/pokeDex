import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EvolutionChain = ({ pokemonName }) => {
  const [evolutionTree, setEvolutionTree] = useState([]);

  useEffect(() => {
    const fetchEvolutionTree = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
        const evolutionChainResponse = await axios.get(response.data.evolution_chain.url);
        const evolutionChain = evolutionChainResponse.data.chain;
        console.log(evolutionChain);
        const evolutionTreeData = getEvolutionTreeData(evolutionChain);
        setEvolutionTree(evolutionTreeData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvolutionTree();
  }, [pokemonName]);

  const getEvolutionTreeData = (evolutionChain) => {
    const evolutionTreeData = [];

    const traverseEvolutionChain = (chain) => {
   
      const pokemonName = chain.species.name;
      const pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.species.url.match(/\/(\d+)\//)[1]}.png`;

      evolutionTreeData.push({
        name: pokemonName,
        image: pokemonImage,
      });

      if (chain.evolves_to.length > 0) {
        traverseEvolutionChain(chain.evolves_to[0]);
      }
    };

    traverseEvolutionChain(evolutionChain);
    return evolutionTreeData;
  };

  return (
    <div className='flex flex-col sm:flex-row gap-5'>
      {evolutionTree.map((pokemon) => (

        <Link to={`/pokeDetails/${pokemon.name}`} key={pokemon.name} className="w-full md:max-w-full flex flex-col max-w-full  rounded-md items-center hover:bg-slate-50 shadow">
          {console.log(pokemon)}
          <img src={pokemon.image} alt={pokemon.name} className="w-36" />
          <span className="text-2xl md:text-3xl">{pokemon.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default EvolutionChain;
