import style from "./style.module.css";
import React, { useState, useContext } from "react";
import SongCard from "../../components/SongCard";
import { songsContext } from "../../Layout";
import { playerSongPopupContext } from "../../pages/HomePage";

export default function SongPage(props) {
  const { songsList } = useContext(songsContext);
  const { playerSongPopup, setPlayerSongPopup, isOnPause, setIsOnPause} = useContext(
    playerSongPopupContext
  );
  return (
    <div className={style.song_page}>
      {songsList &&
        songsList.map((song, index) => (
          <SongCard
            render={props.render}
            onClickPlay={() => {
              setPlayerSongPopup(prev=>({
                id: song.id,
                index,
              }));
            }}
            onClickPrev={() =>
              setPlayerSongPopup(prev=>({
                id: songsList[index - 1].id,
                index: index - 1,
              }))
            }
            onClickNext={() =>
              setPlayerSongPopup(prev=>({
                id: songsList[index + 1].id,
                index: index + 1,
              }))
            }
            play={playerSongPopup}
            song={song}
            index={index}
            key={song.id}
            isOnPause={isOnPause}
            setIsOnPause={setIsOnPause}
          />
        ))}
    </div>
  );
}
