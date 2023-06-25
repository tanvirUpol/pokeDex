import { Link } from "react-router-dom";

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
  

const PokeCard = ({pokemon,pokemonDetails,index}) => {
    const types = pokemonDetails[index]?.types.map(
        (type) => type.type.name
      );

    const pokemonTypeColors = types?.map((type) =>
        typeColors.find((color) => color.type === type)
    );

  return (
    
    <>
        
        <Link  className="bg-gray-100 shadow p-4 rounded hover:bg-gray-200">
                  {/* types */}
                  <div className="flex justify-end items-center gap-2 text-lg">
                    {pokemonTypeColors?.map((typeColor, index) => (
                      <p
                        key={index}
                        className="py-1 px-3 capitalize rounded text-white"
                        style={{ backgroundColor: typeColor?.bgColor }}
                      >
                        {typeColor?.type}
                      </p>
                    ))}
                  </div>
                  {/* image */}
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.match(
                      /\/(\d+)\//
                    )[1]}.png`}
                    alt={pokemon.name}
                    className="mx-auto mb-2  sm:w-full  sm:max-w-full"
                  />
                  {/* namr */}
                  <p className="text-center capitalize text-2xl">{pokemon.name}</p>
        </Link>
    </>
  )
}
export default PokeCard