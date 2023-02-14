import style from "./style.module.css";
import React, { useContext } from "react";
import { useRef } from "react";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../helpers/apiCalls";
import { userContext } from "../../App";

function Login() {
  const { setUser } = useContext(userContext);
  const userEmailInput = useRef();
  const userPasswordInput = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await apiCalls("post", "user/login", {
      email: userEmailInput.current.value,
      password: userPasswordInput.current.value,
    });
    localStorage.token = token.data;
    setUser(true);
    navigate("../home");
  };
  return (
    <div className={style.formLoginContainer}>
      <form className={style.formLogin} onSubmit={handleSubmit}>
        <h2 className={style.header}>LOGIN</h2>
        <Input
          className={style.inputLogin}
          type="email"
          name="input"
          placeholder="email"
          required={true}
          inputRef={userEmailInput}
        />
        <Input
          className={style.inputLogin}
          type="password"
          name="input"
          placeholder="password"
          required={true}
          inputRef={userPasswordInput}
        />
        <div className={style.login_buttons}>
          <Button type="submit" className={style.login_button} text="login" />
          <Button
            type="text"
            className={style.login_button}
            text="register"
            onClick={() => navigate("./register")}
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
