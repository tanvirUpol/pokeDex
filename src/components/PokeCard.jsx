import { Link } from "react-router-dom";


  const PokeCard = ({pokemon,pokemonTypeColors}) => {


  return (
    
    <>
        
        <Link to={`/pokeDetails/${pokemon.name}`} className="bg-gray-100 shadow p-4 rounded hover:bg-gray-200">
                  {/* types */}
                  <div className="flex justify-end items-center gap-2 text-lg">
                    {pokemonTypeColors?.map((typeColor, index) => (
                      <p
                        key={index}
                        className="px-4 py-1 rounded-lg text-white text-sm uppercase"
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