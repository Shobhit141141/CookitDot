import { useState } from "react";
import { useAuthcontext } from "./useAuthcontext";
import { Navigate, NavigationType } from "react-router-dom";


export const useSignup = () => {
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const { dispatch } = useAuthcontext()
  const api_url = import.meta.env.VITE_SERVER_URL

  const signup = async (username, email, password) => {
    setloading(true)
    seterror('')

    const response = await fetch(`${api_url}api/user/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })


    if (!response.ok) {
      const json = await response.json()
      setloading(false)
      seterror(json.error)
    }
  
      const json = await response.json()
      localStorage.setItem('user', JSON.stringify(json))
      dispatch({ type: 'LOGIN', payload: json })

      setloading(false)


    
  }
  return { signup, loading, error }
}
