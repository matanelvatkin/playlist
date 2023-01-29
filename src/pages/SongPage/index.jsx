import style from './style.module.css'
import React, { useState } from 'react'
import SongCard from '../../components/SongCard'
import { useContext } from 'react'
import { songsContext } from '../../Layout'

export default function SongPage(props) {
  const {songsList} = useContext(songsContext)
  const [play, setPlay]=useState()
  return (
    <div className={style.song_page}>
      {
        songsList&&songsList.map((song,index) =><SongCard render={props.render} onClickPlay={()=>setPlay(song.id)} play ={play} song={song} index={index} key = {song.id}/>)
      }
    </div>
  )
}
