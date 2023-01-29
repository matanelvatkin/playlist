import style from "./style.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import PlayListCard from "../../components/PlaylistCard";
import { userContext } from "../../App";
import apiCalls from "../../helpers/apiCalls";
import { useNavigate } from "react-router-dom";
import { songsContext } from "../../Layout";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function PlaylistPage() {
  const { setSongsList } = useContext(songsContext);
  const playlistsRef = useRef();
  const navigate = useNavigate();
  const [newPlaylist, setNewPlaylist] = useState(false);
  const [playlists, setPlaylists] = useState();
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
    go();
  }, [playlistName]);
  useEffect(() => {
    const go = async () => {
      const res = await apiCalls("get", "user/playlists", undefined);
      setPlaylists(res.data);
    };
    go();
  }, []);
  const getPlaylistSongs = async (_id) => {
    const res = await apiCalls("get", `playlist/${_id}`, undefined);
    setSongsList(res.data.songs.map(song=>song.song));
    navigate("../songs");
  };
  const createNewPlaylist = () => {
    setNewPlaylist(true);
  };
  return (
    <>
      {!newPlaylist && (
        <div>
          {playlists &&
            playlists.map((playlist) => (
              <PlayListCard
                key={playlist._id}
                name={playlist.name}
                onClick={getPlaylistSongs}
                _id={playlist._id}
              />
            ))}
          <Button onClick={createNewPlaylist} text={"create new playlist"}>
            {" "}
          </Button>
        </div>
      )}
      {newPlaylist && (
        <div>
          <Input
            placeholder="playlist name"
            type="text"
            onKeyDown={onKeyDown}
          />
          <Input value="+" type="button" onClick={onClick} />
        </div>
      )}
    </>
  );
}
