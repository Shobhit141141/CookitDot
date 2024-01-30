import { useState } from "react";
import { useAuthcontext } from "./useAuthcontext";
import { Navigate, NavigationType } from "react-router-dom";
export const useSignup = () => {
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const { dispatch } = useAuthcontext()


  const signup = async (username, email, password) => {
    setloading(true)
    seterror('')

    // try {
    //   const response = await fetch('http://localhost:5000/api/user/signup', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', },
    //     body: JSON.stringify({ username, password })
    //   });

    //   if (!response.ok) {
    //     const json = await response.json();
    //     throw new Error(json.error);
    //   }

    //   const json = await response.json();
    //   localStorage.setItem('user', JSON.stringify(json));
    //   dispatch({ type: 'LOGIN', payload: json });
    // } catch (error) {
    //   setError(error.message);
    // } finally {
    //   setLoading(false);
    //   <Navigate to="/" />
    // }

    const response = await fetch('http://localhost:5000/api/user/signup', {
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
