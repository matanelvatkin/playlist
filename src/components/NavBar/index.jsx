import React, { useContext } from "react";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { userContext, windowLocationContext } from "../../App";

export default function NavBar({ setOnClick }) {
  const navigate = useNavigate();
  const {setUser} = useContext(userContext)
  const { setWindowLocation } = useContext(windowLocationContext);
  return (
    <div className={style.nav_bar}>
      <Button
        className={style.btn_nav_bar}
        onClick={() => {
          setOnClick((prev) => !prev);
          setWindowLocation(prev=> "home");
          navigate("/home");
        }}
        text="home"
      />
      <Button
        className={style.btn_nav_bar}
        onClick={() => {
          setWindowLocation("playlist");
          navigate("/playlists");
        }}
        text="playlists"
      />
      <Button
        className={style.btn_nav_bar}
        onClick={() => {
          setWindowLocation("favorite");
          navigate("/favorite");
        }}
        text="favorite songs"
      />
      <Button
        className={style.btn_nav_bar}
        onClick={() => {
          localStorage.token = null;
          setUser(false)
          navigate("/login");
        }}
        text="logOut"
      />
    </div>
  )
}
