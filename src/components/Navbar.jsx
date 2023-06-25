import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
     <nav className="my-3" >
        <ul className="flex items-center justify-between" >
          <li>
            <Link to="/">
                <img className="w-10" src="/assets/pokemonLogo.svg" alt="" />
            </Link>
          </li>
          <li>
            <Link to="https://github.com/tanvirUpol" target="_blank" className="flex items-center text-xl gap-2">
                <img className="w-10" src="/assets/githubLogo.svg" alt="" />
                <span>Github</span>
            </Link>
          </li>
        </ul>
     </nav>
     <hr />
     <Outlet/>
    </>
  )
}
export default Navbar