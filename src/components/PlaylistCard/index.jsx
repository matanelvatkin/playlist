import style from './style.module.css'
import React from 'react'

export default function PlayListCard({name,onClick,_id,...props}) {
  return (
    <div onClick={()=>onClick(_id, name)} className="PlayListCard" {...props} >
      {name}
    </div>
  )
}
