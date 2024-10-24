import React, { createContext, useState } from "react";

export const addResponseContext = createContext();
export const editResponseContext = createContext();
export const profileUpdateContext=createContext()

function ContextShare({ children }) {

  const [addUpdate, setaAddUpdate] = useState("");
  const [editUpdate, setEditUpdate] = useState("");
  const [editProfile, setEditProfile] = useState("");
  
  return (
    <>
      
        <profileUpdateContext.Provider value={{editProfile, setEditProfile}}>
          <addResponseContext.Provider value={{addUpdate, setaAddUpdate}}>
            <editResponseContext.Provider value={{editUpdate, setEditUpdate}}>
              {children}
              </editResponseContext.Provider>
            </addResponseContext.Provider>
        </profileUpdateContext.Provider>
      
    </>
  );
}

export default ContextShare;
