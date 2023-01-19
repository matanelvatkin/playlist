import style from './style.module.css'
import React from 'react'
import { TbPlayerPause, TbPlayerPlay, TbPlayerSkipBack, TbPlayerSkipForward } from 'react-icons/tb'
import { useState } from 'react'
import { useEffect } from 'react'

export default function ControlSong({onClickPlay,id,play}) {
  const [isPlaying,setIsPlaying] = useState(false)
  useEffect(()=>{
    if(play!==id.songId&&isPlaying){
      setIsPlaying(false)
    }
  },[play])
  return (
    <div className={style.control_song}>
      <TbPlayerSkipBack style={{fontSize:"25px"}}/>
      {!isPlaying&&<TbPlayerPlay style={{fontSize:"25px"}} onClick={()=>{
          setIsPlaying(prev=>!prev)
          onClickPlay()
        }}/>  }
      {isPlaying&&<TbPlayerPause style={{fontSize:"25px"}} onClick={()=>{
          setIsPlaying(prev=>!prev)
          onClickPlay()
        }}/>  }
      <TbPlayerSkipForward style={{fontSize:"25px"}}/>
    </div>
  )
}


