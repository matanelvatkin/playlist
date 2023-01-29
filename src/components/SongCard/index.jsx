import style from "./style.module.css";
import React, { useContext, useState } from "react";
import ControlSong from "../ControlSong";
import { BsHeart, BsHeartFill, BsPlusCircle } from "react-icons/bs";
import { addToPlaylistPopupContext } from "../../pages/HomePage";
import apiCalls from "../../helpers/apiCalls";
import { userContext } from "../../App";

export default function SongCard({ onClickPlay, song, index, play ,...props}) {
  const { setAddToPlaylistPopup } = useContext(addToPlaylistPopupContext);
  const {user,setUser} =useContext(userContext)
  const addSongToFavorite = async (song) => {
    const res = await apiCalls("put", "user/favorite", {
      id: song.id,
      title: song.title,
      duration_formatted: song.duration_formatted,
      image: song.image,
    });
    setUser(res.data)
  };
  const isFavorited=()=>{
    return user.favoritesSongs.find(v=>v.song.id === song.id&&v.isActive) 
  }
  const deleteSongFromFavorites=async(song)=>{
    const res = await apiCalls("put", "user/favorite/song/delete", {id: song.id})
    if(props.render) props.render(prev=>!prev)
    setUser(res.data)
  }
  if (song.thumbnail) {
    song.image = song.thumbnail.url;
  }
  return (
    <>
      <div className={style.song_card}>
        <div className={style.control_img}>
          <img className={style.song_img} src={song.image} />
          <div className={style.add_like}>
          <BsPlusCircle onClick={() => setAddToPlaylistPopup(song)} />
          {!isFavorited()&&<BsHeart onClick={() => addSongToFavorite(song)} />}
          {isFavorited()&&<BsHeartFill color="yellow" onClick={() => deleteSongFromFavorites(song)}/>}
          </div>
        </div>
        <div className={style.details_control}>
          <div className={style.details}>
            <span>{song.title.split("-")[0]}</span>
            <br />
            <span>{song.title.split("-")[1]}</span>
            <br />
            <span>{song.duration_formatted}</span>
          </div>
          <div className={style.ControlSong}>
            <ControlSong
              onClickPlay={onClickPlay}
              id={{ songId: song.id, index }}
              play={play}
            />
          </div>
        </div>
      </div>
    </>
  );
}
