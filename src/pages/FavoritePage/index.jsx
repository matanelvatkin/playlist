import style from './style.module.css'
import React, { useContext, useEffect, useState } from 'react'
import SongPage from '../SongPage'
import { songsContext } from '../../Layout'
import apiCalls from '../../helpers/apiCalls'

export default function FavoritePage() {
  const {setSongsList} = useContext(songsContext)
  const [render,setReender] = useState(false)
  useEffect(()=>{
  const getFavoriteSong =async ()=>{
    let results = await apiCalls("get","user/favorite");
    results = results.data.favoritesSongs.filter(s=>s.isActive).map(s=>s.song)
    setSongsList(results)
  }
  getFavoriteSong()
  },[render])
  return (
    <SongPage render={setReender}/>
  )
}

