import { createContext, useState } from "react";

export const AuthContext = createContext({
    
    uid: '1', 

})

function AuthProvider({children}) {
    const [uid, setUid] = useState('1');

    return (
        <AuthContext.Provider value={{uid, setUid}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;


