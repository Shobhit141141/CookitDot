import { useState } from 'react'
import reactLogo from '../public/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import Nav from './components/Nav'
import Create from './pages/Create'
import Recipes from './pages/Recipes'
import Recipe from './pages/Recipe'




function App() {

  return (

    <div className="main">
      <BrowserRouter>
       

        <Nav/>
        <Routes>
            <Route path="/" element={<Home />}/>

            <Route path="Recipes" element={<Recipes />} />
            <Route path="Create" element={<Create />} />
            <Route path="Recipes/:id" element={<Recipe/>} />
            
            {/* <Route path="*" element={<NoPage />} /> */}
          
        </Routes>
       
        <Footer/>


       
        
      </BrowserRouter>
    </div>

  )
}

export default App;
