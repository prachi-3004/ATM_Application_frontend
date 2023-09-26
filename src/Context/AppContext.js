// stores loggedin user email in context
import { createContext, useState, useEffect } from "react";
const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [user, setUser] = useState();
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
