import style from "./style.module.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import ControlSong from "../ControlSong";
import { playerSongPopupContext } from "../../pages/HomePage";
import { songsContext } from "../../Layout";
import YouTube from "react-youtube";
import Button from "../Button";

function Popupsong() {
  const { playerSongPopup, setPlayerSongPopup ,isOnPause, setIsOnPause} = useContext(
    playerSongPopupContext
  );
  const [showVideo, setShowVideo] = useState(false)
  const { songsList } = useContext(songsContext);
  const youtubeRef = useRef();
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const onReady = (e) => {
    youtubeRef.current = e.target;
  };
  useEffect(()=>{
    if(youtubeRef.current){
      if (isOnPause) {
        youtubeRef.current.playVideo();
      } else {
        youtubeRef.current.pauseVideo();
      }
    }
  },[isOnPause])
  return (
    <div className={style.popupsong}>
      <div>
        <ControlSong
          onClickPlay={()=>{}}
          onClickPrev={() =>
            setPlayerSongPopup({
              id: songsList[playerSongPopup.index - 1].id,
              index: playerSongPopup.index - 1,
            })
          }
          onClickNext={() =>
            setPlayerSongPopup({
              id: songsList[playerSongPopup.index + 1].id,
              index: playerSongPopup.index + 1,
            })
          }
          play={playerSongPopup}
          id={{ songId: playerSongPopup.id, index: playerSongPopup.index }}
          isOnPause={isOnPause}
          setIsOnPause={setIsOnPause}
        />
        <Button className={style.video_button} onClick={()=>{
          setShowVideo(prev=>!prev)
        }}
        text={!showVideo?"show video" : "hide video" }/>
        <YouTube className={!showVideo?style.video:style.showVideo} videoId={playerSongPopup.id} opts={opts} onReady={onReady} />;
      </div>
    </div>
  );
}

export default Popupsong;
