import style from './style.module.css'
import React from 'react'
import ControlSong from '../ControlSong'
import {BsHeart, BsPlusCircle} from 'react-icons/bs'
import { useState } from 'react'
export default function SongCard({onClickPlay,song,index,play}) {  
  return (<>
    <div className={style.song_card}>
      <div className={style.control_img}>
        <img  className={style.song_img} src ={song.thumbnail.url}/>
        <BsPlusCircle/>
        <BsHeart/>
      </div>
      <div className={style.details_control}>
        <div className={style.details}>
          <span>{song.title.split('-')[0]}</span><br/>
          <span>{song.title.split('-')[1]}</span><br/>
          <span>{song.duration_formatted}</span>
        </div>
        <div className={style.ControlSong}><ControlSong onClickPlay={onClickPlay} id={{songId:song.id,index}} play={play}/></div>
      </div>
    </div>
  </>
  )
}
