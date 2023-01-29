import React from 'react'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'

export default function NavBar({setOnClick}){
  const navigate = useNavigate()
  return (
    <div className={style.nav_bar}>
        <Button className={style.btn_nav_bar} onClick={()=>{
          setOnClick(prev=>!prev)
          navigate('/home')}} text="home" />
        <Button className={style.btn_nav_bar} onClick={()=>navigate('/playlists')} text="playlists" />
        <Button className={style.btn_nav_bar} onClick={()=> navigate('/favorite')} text="favorite songs" />
        <Button className={style.btn_nav_bar} onClick={()=>navigate('/profile')} text="profile" />
      {/* //profile image
      //name
      //email */}
    </div>
  )
}
