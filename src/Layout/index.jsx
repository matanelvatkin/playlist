import React from "react";
import style from "./style.module.css";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useContext } from "react";
import { userContext, windowLocationContext } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import apiCalls from "../helpers/apiCalls";

export const songsContext = createContext()
export default function Layout() {
  const { user, setUser } = useContext(userContext);
  const [searchFilter, setSearchFilter] = useState("מאיר בנאי");
  const [songsList, setSongsList] = useState([]);
  const [onClick, setOnClick] = useState(false);
  const {setWindowLocation} = useContext(windowLocationContext)


  const options = {
    method: "GET",
    url: "https://simple-youtube-search.p.rapidapi.com/search",
    params: { query: "" + searchFilter, safesearch: "false" },
    headers: {
      "X-RapidAPI-Key": "458302a80bmsh65f83ca14b6e60bp12d077jsnc759f59bdd86",
      "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
    },
  };
  const sendRequsetToYoutube = () => {
    axios
      .request(options)
      .then((response) => {
        console.log(response.data.results);
        setWindowLocation("home")
        setSongsList(response.data.results);
      })
      .catch((error) => {
        setSearchFilter({
          results: [{ title: "we coudn't find your search" }],
        });
      });
  };
  useEffect(() => {
    const go = async()=>{
      const results = await apiCalls("get","user")
      console.log(results.data);
      setUser(results.data);
    }
    if(localStorage.token && (user === 'true' || !user))go()
    else if(!localStorage.token)setUser(false)
    if (user) {
      sendRequsetToYoutube();
    }
  },[]);
  useEffect(() => {
    sendRequsetToYoutube();
  }, [searchFilter,onClick]);

  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Header setSearchFilter={setSearchFilter}/>
      </header>
      <div className={style.main}>
        <songsContext.Provider value={{songsList, setSongsList}}>
            <Routes>
                <Route path="/*" element={user ? <HomePage setOnClick={setOnClick}/> : <LoginPage />} />
            </Routes>
        </songsContext.Provider>
      </div>
    </div>
  );
}
