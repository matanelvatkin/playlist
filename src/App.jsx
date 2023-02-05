import { useState } from 'react';
import { createContext } from 'react';
import './global.css';
import Layout from './Layout';


export const userContext = createContext()
export const windowLocationContext = createContext()
export const popupSongContext = createContext()
function App() {
  const [user,setUser] = useState()
  const [windowLocation,setWindowLocation] = useState("home")
  return (
    <windowLocationContext.Provider value={{windowLocation,setWindowLocation}}>
    <userContext.Provider value={{user,setUser}}>
      <Layout/>
    </userContext.Provider>
    </windowLocationContext.Provider>
  );
}

export default App;
