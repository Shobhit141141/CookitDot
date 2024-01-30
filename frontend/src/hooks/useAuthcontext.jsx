import { Authcontext } from "../context/Authcontext";
import { useContext } from "react";
export const useAuthcontext = () => {

    const context = useContext(Authcontext)

    if(!context){
        throw Error('error')
    }

    return context
}