import { useState } from "react";
import { useAuthcontext } from "./useAuthcontext";
export const useLogout = () => {
   
    const { dispatch } = useAuthcontext()
    const Logout = () => {
        
          localStorage.removeItem('user')
          dispatch({ type: 'LOGOUT'})
    
    }
    
      
    return { Logout}
}
