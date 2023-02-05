import style from "./style.module.css";
import React, { useContext } from "react";
import {
  TbPlayerPause,
  TbPlayerPlay,
  TbPlayerSkipBack,
  TbPlayerSkipForward,
} from "react-icons/tb";
import { useState } from "react";
import { useEffect } from "react";

export default function ControlSong({
  onClickPlay,
  id,
  play,
  onClickPrev,
  onClickNext,
  isOnPause,
  setIsOnPause,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (play.id !== id.songId) {
      setIsPlaying(false);
    } else if (play.id === id.songId) {
      setIsPlaying(true);
    }
  }, [play]);

  return (
    <div className={style.control_song}>
      <TbPlayerSkipBack
        className={style.TbPlayerSkipBack}
        style={{ fontSize: "25px" }}
        onClick={() => {
          onClickPrev();
        }}
      />
      {!isPlaying ? (
        <TbPlayerPlay
          className={style.TbPlayerPlay}
          style={{ fontSize: "25px" }}
          onClick={() => {
            setIsPlaying(true);
            setIsOnPause((prev) => true);
            onClickPlay();
          }}
        />
      ) : isOnPause ? (
        <TbPlayerPause
          className={style.TbPlayerPause}
          style={{ fontSize: "25px" }}
          onClick={() => {
            setIsPlaying(false);
            setIsOnPause((prev) => false);
            onClickPlay();
          }}
        />
      ) : (
        <TbPlayerPlay
          className={style.TbPlayerPlay}
          style={{ fontSize: "25px" }}
          onClick={() => {
            setIsPlaying(true);
            setIsOnPause((prev) => true);
            onClickPlay();
          }}
        />
      )}
      <TbPlayerSkipForward
        className={style.TbPlayerSkipForward}
        style={{ fontSize: "25px" }}
        onClick={() => {
          onClickNext();
        }}
      />
    </div>
  );
}
