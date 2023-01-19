import React from 'react'
import { useContext } from 'react'
import { userContext } from '../../App'
import Input from '../Input'
import style from './style.module.css'
import {TbSearch} from 'react-icons/tb'
import {RiMenuUnfoldFill} from 'react-icons/ri'
import { useRef } from 'react'

export default function Header({setSearchFilter}) {
  const {user} =useContext(userContext)
  const searchInputRef = useRef()
  const onKeyDown = (e) =>{
    searchInputRef.current=e.target
    if(e.key === 'Enter'){
      setSearchFilter(searchInputRef.current.value)
    }
  }
  const onClick = () =>{
    setSearchFilter(searchInputRef.current.value)
  } 
  return (
    <div className={style.main_header}>
      <label>
        <RiMenuUnfoldFill style={{fontSize:"3vw"}}/>
      </label>
      {user?<>
        <div className={style.search}>
          <Input type="text" placeholder="search" className={style.search_input} onKeyDown={onKeyDown} /> 
          <TbSearch onClick={onClick} style={{fontSize:"25px"}}/>
        </div>
        

      </>:
      <>
      //register
      </>}
      <label className={style.logo}>playlistLogo</label>
    </div>
  )
}
