import { useState } from 'react'
import reactLogo from '/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from './components/Footer'
import Nav from './components/Nav'
import Create from './pages/Create'
import Recipes from './pages/Recipes'
import Recipe from './pages/Recipe'
import Update from './pages/Update'
import Userinput from './components/UserSignUp'
import UserLogIn from './components/UserLogIn'
import UserSignUp from './components/UserSignUp'
import { useAuthcontext } from './hooks/useAuthcontext'
import UserRecipe from './pages/UserRecipe'

function App() {

  const { user } = useAuthcontext()
  return (

    <div className="main">
      <BrowserRouter>


        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/UserRecipe" element={<UserRecipe />} />
          <Route path="Recipes" element={user ? <Recipes /> : <Navigate to="/Login" />} />
          <Route path="Create" element={user ? <Create /> : <Navigate to="/Login" />} />
          <Route path="Update/:id" element={<Update />} />
          <Route path="Recipes/:id" element={<Recipe />} />
          <Route path="SignUp" element={!user ? <UserSignUp /> : <Navigate to="/Login" />} />
          <Route path="LogIn" element={!user ? <UserLogIn /> : <Navigate to='/' />} />
          {/* <Route path="*" element={<NoPage />} /> */}

        </Routes>

        <Footer />




      </BrowserRouter>
    </div>

  )
}

export default App;
