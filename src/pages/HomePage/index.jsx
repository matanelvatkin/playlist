import React, { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import apiCalls from "../../helpers/apiCalls";
import FavoritePage from "../FavoritePage";
import PlaylistPage from "../PlaylistPage";
import ProfilePage from "../ProfilePage";
import SongPage from "../SongPage";
import style from "./style.module.css";

export const addToPlaylistPopupContext = createContext();
export const playerPopupContext = createContext();

export default function HomePage({ setOnClick }) {
  const [addToPlaylistPopup, setAddToPlaylistPopup] = useState(false);
  const [playerPopup, setPlayerPopup] = useState(false);
  const [playlists, setPlaylists] = useState();
  useEffect(() => {
    const go = async () => {
      const res = await apiCalls("get", "user/playlists", undefined);
      setPlaylists(res.data);
    };
    go();
  }, [addToPlaylistPopup]);
  const addSongToPlaylists = async (playlist) => {
    const results = await apiCalls("put", "playlist/song", {
      id: addToPlaylistPopup.id,
      title: addToPlaylistPopup.title,
      duration_formatted: addToPlaylistPopup.duration_formatted,
      image: addToPlaylistPopup.thumbnail.url,
      _id: playlist._id,
    });
    setAddToPlaylistPopup(false);
  };
  return (
    <addToPlaylistPopupContext.Provider
      value={{ addToPlaylistPopup, setAddToPlaylistPopup }}
    >
      <playerPopupContext.Provider value={{ playerPopup, setPlayerPopup }}>
        <>
          {addToPlaylistPopup && (
            <div
              className={style.addToPlaylistPopup}
              onClick={() => {
                setAddToPlaylistPopup(false);
              }}
            >
              <div className={style.showPlaylists}>
                  {playlists &&
                    playlists.map((playlist) => (
                      <Button
                        key={playlist._id}
                        text={playlist.name}
                        onClick={() => addSongToPlaylists(playlist)}
                        className={style.playlistsList}
                      />
                    ))}
              </div>
            </div>
          )}
          <div className={style.main}>
            <div className={style.nav_bar}>
              <NavBar setOnClick={setOnClick} />
            </div>
            <main className={style.main_page}>
              <Routes>
                <Route path="/*" element={<SongPage />} />
                <Route path="/favorite" element={<FavoritePage/>} />
                <Route path="/playlists" element={<PlaylistPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
          </div>
        </>
      </playerPopupContext.Provider>
    </addToPlaylistPopupContext.Provider>
  );
}
