import style from "./style.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlayListCard from "../../components/PlaylistCard";
import apiCalls from "../../helpers/apiCalls";
import { useNavigate } from "react-router-dom";
import { songsContext } from "../../Layout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { RiPlayListFill } from "react-icons/ri";

export default function PlaylistPage() {
  const { setSongsList } = useContext(songsContext);
  const playlistsRef = useRef();
  const navigate = useNavigate();
  const [newPlaylist, setNewPlaylist] = useState(false);
  const [playlists, setPlaylists] = useState();
  const [deletePlaylists, setDeletePlaylists] = useState(false);
  const [playlistName, setPlaylistName] = useState();
  const onKeyDown = (e) => {
    playlistsRef.current = e.target;
    if (e.key === "Enter") {
      setPlaylistName(playlistsRef.current.value);
    }
  };
  const onClick = () => {
    setPlaylistName(playlistsRef.current.value);
  };
  useEffect(() => {
    const go = async () => {
      const res = await apiCalls("post", "playlist", { name: playlistName });
      setPlaylists((prev) => res.data.playlists);
      setNewPlaylist((prev) => !prev);
    };
    if (playlistName) go();
  }, [playlistName]);
  useEffect(() => {
    const go = async () => {
      const res = await apiCalls("get", "user/playlists", undefined);
      setPlaylists(res.data);
    };
    go();
  }, [playlists]);
  const getPlaylistSongs = async (_id, name) => {
    const res = await apiCalls("get", `playlist/${_id}`, undefined);
    sessionStorage.setItem("playlist_id", _id);
    console.log(res.data.songs);
    setSongsList(res.data.songs.map((song) => song.song));
    navigate("../songs");
  };
  const createNewPlaylist = () => {
    setNewPlaylist(true);
  };
  const deletePlaylist = async (playlist_id) => {
    await apiCalls("put", `playlist/delete`, { _id: playlist_id });
    setDeletePlaylists((prev) => !prev);
    setPlaylists((prev) => false);
  };
  return (
    <>
      <h2 className={style.playlist_title}>
        <span className={style.playlist_header}>play</span>lists
      </h2>
      <div
        className={style.playlistContainer}
        onClick={() => {
          setDeletePlaylists(false);
        }}
      >
        {playlists &&
          playlists.map((playlist) => (
            <div
              className={style.playlist_card}
              onClick={() => {
                if(!deletePlaylists) return getPlaylistSongs(playlist._id, playlist.name)
              }}
              key={playlist._id}
            >
              {playlist.isActive && (
                <PlayListCard
                  // onClick={getPlaylistSongs}
                  name={playlist.name}
                  _id={playlist._id}
                />
              )}
              {!deletePlaylists ? (
                <RiPlayListFill className={style.playlist_icons} />
              ) : (
                <BiMinusCircle
                  className={style.playlist_icons}
                  onClick={() => deletePlaylist(playlist._id)}
                />
              )}
            </div>
          ))}
      </div>
      <div className={style.control_button}>
        <BsPlusCircle
          className={`${style.playlist_icons} ${style.plus_icon}`}
          onClick={createNewPlaylist}
        />
        <BiMinusCircle
          className={style.playlist_icons}
          onClick={() => setDeletePlaylists(true)}
        />
      </div>
      {newPlaylist && (
        <div>
          <Input
            className={style.playlist_input}
            placeholder="playlist name"
            type="text"
            onKeyDown={onKeyDown}
          />
          <BsPlusCircle
            className={`${style.playlist_icons} ${style.plus_icon}`}
            onClick={onClick}
          />
        </div>
      )}
    </>
  );
}
