import style from "./style.module.css";
import React, { useState, useContext } from "react";
import SongCard from "../../components/SongCard";
import { songsContext } from "../../Layout";
import { playerSongPopupContext } from "../../pages/HomePage";
import { windowLocationContext } from "../../App";

export default function SongPage(props) {
  const { songsList } = useContext(songsContext);
  const { windowLocation } = useContext(windowLocationContext);
  const { playerSongPopup, setPlayerSongPopup, isOnPause, setIsOnPause } =
    useContext(playerSongPopupContext);
  return (
    <div className={style.main_song_page}>
      {windowLocation === "favorite" && (
        <h2>
          <span className={style.song_header}>favorite</span>songs
        </h2>
      )}
      <div className={style.song_page}>
        {songsList &&
          songsList.map((song, index) => (
            <SongCard
              render={props.render}
              onClickPlay={() => {
                setPlayerSongPopup((prev) => ({
                  id: song.id,
                  index,
                }));
              }}
              onClickPrev={() => {
                if (index !== 0) {
                  setPlayerSongPopup((prev) => ({
                    id: songsList[index - 1].id,
                    index: index - 1,
                  }));
                } else {
                  setPlayerSongPopup((prev) => ({
                    id: songsList[songsList.length - 1].id,
                    index: songsList.length - 1,
                  }));
                }
              }}
              onClickNext={() => {
                if (index !== songsList.length-1) {
                  setPlayerSongPopup((prev) => ({
                    id: songsList[index  + 1].id,
                    index: index + 1,
                  }));
                } else {
                  setPlayerSongPopup((prev) => ({
                    id: songsList[0].id,
                    index: 0,
                  }));
                }
              }}
              play={playerSongPopup}
              song={songsList[index]}
              index={index}
              key={songsList[index].id}
              isOnPause={isOnPause}
              setIsOnPause={setIsOnPause}
            />
          ))}
      </div>
    </div>
  );
}
