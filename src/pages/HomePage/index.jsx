import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import PlaylistPage from '../PlaylistPage'
import ProfilePage from '../ProfilePage'
import SongPage from '../SongPage'
import style from './style.module.css'

export default function HomePage(){
  return (
    <div className = {style.main}>
        <div className = {style.nav_bar}>
            <NavBar/>
        </div>
        <main className = {style.main_page}>
            <Routes>
              <Route path='/*' element={<SongPage/>}/>
              <Route path='/likedsongs' element={<SongPage/>}/>
              <Route path='/playlists' element={<PlaylistPage/>}/>
              <Route path='/profile' element={<ProfilePage/>}/>
            </Routes>
        </main>
    </div>
  )
}
