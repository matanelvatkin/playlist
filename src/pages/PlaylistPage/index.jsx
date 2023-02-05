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

export default function PlaylistPage() {
  const { setSongsList } = useContext(songsContext);
  const playlistsRef = useRef();
  const navigate = useNavigate();
  const [newPlaylist, setNewPlaylist] = useState(false);
  const [playlists, setPlaylists] = useState();
  const [deletePlaylists, setDeletePlaylists] = useState(false)
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
    if(playlistName) go();
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
    sessionStorage.setItem("playlist_id",_id)
    setSongsList(res.data.songs.map(song=>song.song));
    navigate("../songs");
  };
  const createNewPlaylist = () => {
    setNewPlaylist(true);
  };
  const deletePlaylist = async(playlist_id) => {
    const res = await apiCalls("put", `playlist/delete`, {_id: playlist_id});
    console.log(res);
    setDeletePlaylists(prev=>!prev)
    setPlaylists(prev=>false)
  }
  return (
    <>
        <div>
          {playlists &&
            playlists.map((playlist) => (
              <div key={playlist._id}>
                {playlist.isActive&&<PlayListCard
                name={playlist.name}
                onClick={getPlaylistSongs}
                _id={playlist._id}
                />}
                {deletePlaylists&&<BiMinusCircle  onClick={()=>deletePlaylist(playlist._id)}/>}
                </div>
              ))}
          <BsPlusCircle onClick={createNewPlaylist}/>
          <BiMinusCircle onClick={()=>setDeletePlaylists(true)}/>
        </div>
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
