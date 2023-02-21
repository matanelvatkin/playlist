import React from "react";
import style from "./style.module.css";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { useContext } from "react";
import { userContext, windowLocationContext } from "../App";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import apiCalls from "../helpers/apiCalls";

export const songsContext = createContext();
export default function Layout() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(userContext);
  const [searchFilter, setSearchFilter] = useState("מאיר בנאי");
  const [songsList, setSongsList] = useState([]);
  const [onClick, setOnClick] = useState(false);
  const { windowLocation, setWindowLocation } = useContext(
    windowLocationContext
  );

  const getFavoriteFilter = () => {
    const results = [];
    if (user.favoritesSongs.length > 0) {
      user.favoritesSongs.forEach((song) => {
        if(song.song.title.startsWith(searchFilter)) results.push(song.song)
      });
    }
    setSongsList(results);
  };

  const options = {
    method: "GET",
    url: "https://simple-youtube-search.p.rapidapi.com/search",
    params: { query: "" + searchFilter||"מאיר בנאי", safesearch: "false" },
    headers: {
      "X-RapidAPI-Key": "458302a80bmsh65f83ca14b6e60bp12d077jsnc759f59bdd86",
      "X-RapidAPI-Host": "simple-youtube-search.p.rapidapi.com",
    },
  };
  const sendRequsetToYoutube = () => {
    axios
      .request(options)
      .then((response) => {
        setWindowLocation("home");
        setSongsList(response.data.results);
      })
      .catch((error) => {
        setSearchFilter({
          results: [{ title: "we coudn't find your search" }],
        });
      });
  };
  useEffect(() => {
    console.log(results.data);
    const go = async () => {
      const results = await apiCalls("get", "user");
      setUser(results.data);
    };
    if (!localStorage.token) {
       setUser(false);
       navigate("./login")
    }
    else if (localStorage.token && (user === "true" || !user)) go();
    if (user) {
      sendRequsetToYoutube();
    }
  }, []);
  useEffect(() => {
    if (windowLocation === "favorite") getFavoriteFilter();
    else sendRequsetToYoutube();
  }, [searchFilter, onClick]);
  
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <Header setSearchFilter={setSearchFilter} />
      </header>
      <div className={style.main}>
        <songsContext.Provider value={{ songsList, setSongsList }}>
          <Routes>
            <Route
              path="/*"
              element={
                user ? <HomePage setOnClick={setOnClick} /> : <LoginPage />
              }
            />
          </Routes>
        </songsContext.Provider>
      </div>
    </div>
  );
}
