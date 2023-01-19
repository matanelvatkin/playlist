import React from "react";
import style from "./style.module.css";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useContext } from "react";
import { userContext } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const songsContext = createContext()
export default function Layout() {
  const { user, setUser } = useContext(userContext);
  const [searchFilter, setSearchFilter] = useState("מאיר בנאי");
  const [songsList, setSongsList] = useState([]);
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
        setSongsList(response.data.results);
      })
      .catch((error) => {
        setSearchFilter({
          results: [{ title: "we coudn't find your search" }],
        });
      });
  };
  useEffect(() => {
    setUser(true);
    if (user) {
      sendRequsetToYoutube();
    }
  }, []);
  useEffect(() => {
    sendRequsetToYoutube();
  }, [searchFilter]);

  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Header setSearchFilter={setSearchFilter}/>
      </header>
      <div className={style.main}>
        <songsContext.Provider value={{songsList, setSongsList}}>
            <Routes>
                <Route path="/*" element={user ? <HomePage/> : <LoginPage />} />
            </Routes>
        </songsContext.Provider>
      </div>
    </div>
  );
}