const Loading = () => {
  return (
    <div className="flex justify-center flex-col gap-7 text-4xl items-center h-[80dvh]">

        <img className="animate-spin w-44 max-w-full" src="/assets/pokemonLogo.svg" alt="" />
        <p>Loading...</p>

    </div>
  )
}
export default Loading