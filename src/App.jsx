import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";


// component
import Navbar from './components/Navbar';

// pages
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import NotFound from './pages/NotFound';


function App() {
  
  return (
    <>
       <div className="container px-5 pb-5 mx-auto font-VT323">
          {/* <Navbar/>
          <Home/>
          <PokemonDetails/> */}

          <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path="pokeDetails/:name" element={<PokemonDetails />} />

                {/* Using path="*"" means "match anything", so this route
                      acts like a catch-all for URLs that we don't have explicit
                      routes for. */}
                <Route path="*" element={<NotFound />} />
              </Route>
           </Routes>
      </div>
    </>
  );
}

export default App;
