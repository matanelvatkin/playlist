import style from "./style.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import apiCalls from "../../helpers/apiCalls";

export default function Register() {
  const [gender, setGender] = useState();
  const userfNameInput = useRef();
  const userlNameInput = useRef();
  const userEmailInput = useRef();
  const firstPassword = useRef();
  const secondPassword = useRef();
  const navigate = useNavigate();

  const onChooseGender = (e) => {
    setGender(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await apiCalls("post", "user/register", {
      fName: userfNameInput.current.value,
      lName: userlNameInput.current.value,
      email: userEmailInput.current.value,
      firstPassword: firstPassword.current.value,
      secondPassword: secondPassword.current.value,
      gender: gender,
    });
    navigate("../login");
  };

  return (
    <div className={style.formLoginContainer}>
      <form className={style.formLogin} onSubmit={handleSubmit}>
        <h2 className={style.header}>REGISTER</h2>
        <Input
          className={style.inputLogin}
          type="text"
          name="fName"
          required={true}
          placeholder="First Name"
          inputRef={userfNameInput}
        />
        <Input
          className={style.inputLogin}
          type="text"
          name="lName"
          required={true}
          placeholder="Last Name"
          inputRef={userlNameInput}
        />
        <Input
          className={style.inputLogin}
          type="email"
          name="input"
          required={true}
          placeholder="email"
          inputRef={userEmailInput}
        />
        <Input
          className={style.inputLogin}
          type="password"
          name="firstPassword"
          required={true}
          placeholder="firstPassword"
          inputRef={firstPassword}
        />
        <Input
          className={style.inputLogin}
          type="password"
          name="secondPassword"
          required={true}
          placeholder="secondPassword"
          inputRef={secondPassword}
        />
        <div className={style.radio_container}>
          <label className={style.radio} htmlFor="male">
            Male
            {"  "}
            <Input
              type="radio"
              id="male"
              name="gender"
              onInput={onChooseGender}
              value="male"
            />
          </label>
          <label className={style.radio} htmlFor="female">
            Female
            {"  "}
            <Input
              type="radio"
              id="female"
              name="gender"
              onInput={onChooseGender}
              value="female"
            />
          </label>
        </div>
        <div className={style.login_buttons}>
          <Button
            className={style.login_button}
            text="register"
            type="submit"
          />
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className={style.login_button}
            text="login"
            type="text"
          />
        </div>
      </form>
    </div>
  );
}
