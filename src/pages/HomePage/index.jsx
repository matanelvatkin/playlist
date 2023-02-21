import React, { createContext, useContext, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import NavBar from "../../components/NavBar";
import Popupsong from "../../components/Popupsong";
import apiCalls from "../../helpers/apiCalls";
import FavoritePage from "../FavoritePage";
import PlaylistPage from "../PlaylistPage";
import ProfilePage from "../ProfilePage";
import SongPage from "../SongPage";
import style from "./style.module.css";

export const addToPlaylistPopupContext = createContext();
export const playerSongPopupContext = createContext();

export default function HomePage({ setOnClick }) {
  const [addToPlaylistPopup, setAddToPlaylistPopup] = useState(false);
  const [isOnPause, setIsOnPause] = useState(false);
  const [playerSongPopup, setPlayerSongPopup] = useState({ id: "" });
  const [playlists, setPlaylists] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const go = async () => {
      const res = await apiCalls("get", "user/playlists", undefined);
      setPlaylists(res.data);
    };
    go();
  }, [addToPlaylistPopup]);
  const addSongToPlaylists = async (playlist) => {
    await apiCalls("put", "playlist/song", {
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
      <playerSongPopupContext.Provider
        value={{ playerSongPopup, setPlayerSongPopup, isOnPause, setIsOnPause }}
      >
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
                    <div
                      className={style.playlistsList}
                      onClick={() => addSongToPlaylists(playlist)}
                      key={playlist._id}
                    >
                      <label
                        className={style.playlist_name}
                        >
                        {playlist.name}
                        </label>
                      <BsPlusCircle className={style.playlist_button} />
                    </div>
                  ))}
                <Button
                  className={style.add_playlist}
                  text={"add new playlist"}
                  onClick={() => {
                    navigate("./playlists");
                  }}
                />
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
                <Route path="/favorite" element={<FavoritePage />} />
                <Route path="/playlists" element={<PlaylistPage />} />
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
              </Routes>
            </main>
            {playerSongPopup.id !== "" && <Popupsong />}
          </div>
        </>
      </playerSongPopupContext.Provider>
    </addToPlaylistPopupContext.Provider>
  );
}
