// import { useState } from "react";
// import { useAuthcontext } from "./useAuthcontext";
// export const useLogin = () => {
//     const [error, seterror] = useState('');
//     const [loading, setloading] = useState(false);
//     const { dispatch } = useAuthcontext()
//     const login = async (username, password) => {
//         setloading(true)
    
//         seterror('')
      
//         const response = await fetch('http://localhost:5000/api/user/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username, password })
//         })
//         const json = await response.json()
    
//         if (!response.ok) {
//           setloading(false)
//           seterror(json.error)
//           console.log(json.error)
//         }
//         if (response.ok) {
//           localStorage.setItem('user', JSON.stringify(json))
//           dispatch({ type: 'LOGIN', payload: json })
    
//           setloading(false)
    
//         }
//       }
//       return { login , loading , error}
// }
import { useState } from "react";
import { useAuthcontext } from "./useAuthcontext";
import { Navigate } from "react-router-dom";


export const useLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthcontext();


  const login = async (username, password) => {
    setLoading(true);
    setError('');

    const api_url = import.meta.env.VITE_SERVER_URL
    try {
      const response = await fetch(`${api_url}api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error);
      }

      const json = await response.json();
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      <Navigate to="/"/>
    }
  };

  return { login, loading, error };
};
