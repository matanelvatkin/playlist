import style from "./style.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import ControlSong from "../ControlSong";
import { playerSongPopupContext } from "../../pages/HomePage";
import { songsContext } from "../../Layout";
import YouTube from "react-youtube";
import Button from "../Button";

function Popupsong() {
  const { playerSongPopup, setPlayerSongPopup, isOnPause, setIsOnPause } =
    useContext(playerSongPopupContext);
  const [showVideo, setShowVideo] = useState(false);
  const { songsList } = useContext(songsContext);
  const youtubeRef = useRef();
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay:isOnPause? 1:0
    },
  };
  const onReady = (e) => {
    youtubeRef.current = e.target;
  };
  useEffect(() => {
    if (youtubeRef.current) {
      if (isOnPause) {
        youtubeRef.current.playVideo();
      } else {
        youtubeRef.current.pauseVideo();
      }
    }
  }, [isOnPause]);
  return (
    <div className={style.popupsong}>
      <div>
        <YouTube
          className={!showVideo ? style.video : style.showVideo}
          videoId={playerSongPopup.id}
          opts={opts}
          onReady={onReady}
        />
        <div className={style.song_button}>
          <Button
            className={style.video_button}
            onClick={() => {
              setShowVideo((prev) => !prev);
            }}
            text={!showVideo ? "show video" : "hide video"}
          />
          <ControlSong
            onClickPlay={() => {}}
            onClickPrev={() =>{
              if (playerSongPopup.index !== 0) {
                setPlayerSongPopup((prev) => ({
                  id: songsList[playerSongPopup.index - 1].id,
                  index: playerSongPopup.index - 1,
                }));
              } else {
                setPlayerSongPopup((prev) => ({
                  id: songsList[songsList.length - 1].id,
                  index: songsList.length - 1,
                }));
              }
            }}
            onClickNext={() =>{
              if (playerSongPopup.index !== songsList.length-1) {
                setPlayerSongPopup((prev) => ({
                  id: songsList[playerSongPopup.index  + 1].id,
                  index: playerSongPopup.index + 1,
                }));
              } else {
                setPlayerSongPopup((prev) => ({
                  id: songsList[0].id,
                  index: 0,
                }));
              }
            }}
            play={playerSongPopup}
            id={{ songId: playerSongPopup.id, index: playerSongPopup.index }}
            isOnPause={isOnPause}
            setIsOnPause={setIsOnPause}
          />
        </div>
      </div>
    </div>
  );
}

export default Popupsong;
