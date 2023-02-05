import style from "./style.module.css";
import React, { useContext } from "react";
import { useRef } from "react";
import Input from "../Input";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import apiCalls from "../../helpers/apiCalls";
import { userContext } from "../../App";

function Login() {
  const {setUser} =useContext(userContext)
    const userEmailInput = useRef()
    const userPasswordInput = useRef()
    const navigate = useNavigate()
  const handleSubmit =async(e)=>{
      e.preventDefault();
      const token = await apiCalls("post","user/login",{email:userEmailInput.current.value,password:userPasswordInput.current.value})
      localStorage.token = token.data
      setUser(true)
      navigate("../home")
    }
  return (
    <div className={style.formLoginContainer}>
      <form className={style.formLogin} onSubmit={handleSubmit}>
        <Input
          type="email"
          name="input"
          placeholder="email"
          required={true}
          inputRef={userEmailInput}
        />
        <Input
          type="password"
          name="input"
          placeholder="password"
          required={true}
          inputRef={userPasswordInput}
        />

        <Button type={"submit"} width={"328px"} className={style.login_button} text="login"/>

          <p
            onClick={() => {
              navigate("/register");
            }}
            className={style.register}
          >register
          </p>
      </form>
    </div>
  );
}

export default Login;
