import React from "react";
import { useContext } from "react";
import { userContext } from "../../App";
import Input from "../Input";
import style from "./style.module.css";
import { TbSearch } from "react-icons/tb";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useRef } from "react";
import apiCalls from "../../helpers/apiCalls";

export default function Header({ setSearchFilter }) {
  const { user, setUser } = useContext(userContext);
  const uploadRef = useRef();
  const searchInputRef = useRef();
  const onKeyDown = (e) => {
    searchInputRef.current = e.target;
    if (e.key === "Enter") {
      setSearchFilter(searchInputRef.current.value);
      searchInputRef.current.value = "";
    }
  };
  const ChangeImage = ()=>{
    uploadRef.current.click()
  };
  const uploadImg = async () => {
    const formData = new FormData();
    formData.append("avatar", uploadRef.current.files[0]);
    const user = await apiCalls("put", "user/avatar", formData );
    setUser(user.data);
  };
  const onClick = () => {
    setSearchFilter(searchInputRef.current.value);
    searchInputRef.current.value = "";
  };
  return (
    <div className={style.main_header}>
      {user ? (
        <>
          <div>
            <img
              className={style.avatar}
              onClick={ChangeImage}
              src={`${user.avatar}`}
              alt="avatar"
            />
            {` ${user.fName} ${user.lName}`}
          </div>
          <div className={style.search}>
            <Input
              type="text"
              placeholder="search"
              className={style.search_input}
              onKeyDown={onKeyDown}
            />
            <TbSearch className={style.search_logo} onClick={onClick} style={{ fontSize: "25px" }} />
          </div>
        </>
      ) : (
        <><div></div></>
      )}
      <label className={style.logo}>
        <span>play</span>list
      </label>
      <Input
        className={style.upload}
        type="file"
        inputRef={uploadRef}
        onChange={()=>{uploadImg()}}
      />
    </div>
  );
}
