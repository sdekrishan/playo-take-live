import { createContext, useReducer } from "react";
import AuthReducer, { initialState } from "./AuthReducer";

export const AuthContext = createContext();

const AuthProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer,initialState)

    return (
        <AuthContext.Provider value={{state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )

}


export default AuthProvider;