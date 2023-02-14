import style from "./style.module.css";
import React, { useContext, useState } from "react";
import ControlSong from "../ControlSong";
import { BsHeart, BsHeartFill, BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import apiCalls from "../../helpers/apiCalls";
import { userContext, windowLocationContext } from "../../App";
import { addToPlaylistPopupContext } from "../../pages/HomePage";

export default function SongCard({
  onClickPlay,
  song,
  index,
  play,
  onClickPrev,
  onClickNext,
  isOnPause,
  setIsOnPause,
  ...props
}) {
  const songText = song.title.split("-")
  const { user, setUser } = useContext(userContext);
  const { setAddToPlaylistPopup } = useContext(addToPlaylistPopupContext);
  const { windowLocation } = useContext(windowLocationContext);
  const deleteSongFromPlaylist = async (song) => {
    const res = await apiCalls("put", "playlist/song/delete", {
      playlistId: sessionStorage.getItem("playlist_id"),
      songId: song.id,
    });
    if (props.render) props.render((prev) => !prev);
    setUser(res.data);
  };
  const addSongToFavorite = async (song) => {
    const res = await apiCalls("put", "user/favorite", {
      id: song.id,
      title: song.title,
      duration_formatted: song.duration_formatted,
      image: song.image,
    });
    setUser(res.data);
  };
  const isFavorited = () => {
    if (user.favoritesSongs)
      return user.favoritesSongs.find(
        (v) => v.song.id === song.id && v.isActive
      );
  };
  const deleteSongFromFavorites = async (song) => {
    const res = await apiCalls("put", "user/favorite/song/delete", {
      id: song.id,
    });
    if (props.render) props.render((prev) => !prev);
    setUser(res.data);
  };
  if (song.thumbnail) {
    song.image = song.thumbnail.url;
  }
  return (
    <>
      <div className={style.song_card}>
        <div className={style.control_img}>
          <img className={style.song_img} src={song.image} />
          <div className={style.add_like}>
            {windowLocation !== "playlist" ? (
              <BsPlusCircle className={style.favoriteImage} onClick={() => setAddToPlaylistPopup(song)} />
            ) : (
              <BiMinusCircle className={style.favoriteImage} onClick={() => deleteSongFromPlaylist(song)} />
            )}
            {!isFavorited() && (
              <BsHeart className={style.favoriteImage} onClick={() => addSongToFavorite(song)} />
            )}
            {isFavorited() && (
              <BsHeartFill className={style.favoriteImage}
                onClick={() => deleteSongFromFavorites(song)}
              />
            )}
          </div>
        </div>
        <div className={style.details_control}>
          <div className={style.details}>
            <span className={style.song_text}>{songText[0]}</span>
            <br />
            <span className={style.song_text}>{songText[1]}</span>
            <br />
            <span>{song.duration_formatted}</span>
          </div>
          <div className={style.ControlSong}>
            <ControlSong
              onClickPlay={onClickPlay}
              id={{ songId: song.id, index }}
              play={play}
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
              isOnPause={isOnPause}
              setIsOnPause={setIsOnPause}
            />
          </div>
        </div>
      </div>
    </>
  );
}
