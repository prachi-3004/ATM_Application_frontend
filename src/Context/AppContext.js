import { createContext, useState, useEffect } from "react";

const AppContext = createContext(); //to create the context
//children -
const AppProvider = ({ children }) => {
  const [user, setUser] = useState();

  // useEffect(()=>{
  //     console.log("useffect",user)
  // },[user])

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
