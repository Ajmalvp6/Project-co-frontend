import React, { createContext, useEffect, useState } from 'react'

export const tokenAuthContext=createContext()

function AuthContext({children}) {

    const [isAutherised,setIsAutherised]=useState(false)


    useEffect(()=>{


        if(sessionStorage.getItem("token")){
            setIsAutherised(true)
        }
        else{
            setIsAutherised(false)
        }


    },[isAutherised])



  return (
    <div>
        <tokenAuthContext.Provider value={{isAutherised,setIsAutherised}}>
            {children}
        </tokenAuthContext.Provider>
    </div>
  )
}

export default AuthContext