import style from "./style.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import apiCalls from "../../helpers/apiCalls";

export default function Register() {
  const [gender, setGender] = useState()
  const userfNameInput = useRef();
  const userlNameInput = useRef();
  const userEmailInput = useRef();
  const firstPassword = useRef();
  const secondPassword = useRef();
  const navigate = useNavigate();

 const onChooseGender = (e)=>{
  setGender(e.target.value);
 }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await apiCalls("post", "user/register", {
      fName: userfNameInput.current.value,
      lName: userlNameInput.current.value,
      email: userEmailInput.current.value,
      firstPassword: firstPassword.current.value,
      secondPassword: secondPassword.current.value,
      gender:gender
    });
    navigate("../login");
  };

  return (
    <div className={style.formLoginContainer}>
      <form className={style.formLogin} onSubmit={handleSubmit}>
        <Input
          type="text"
          name="fName"
          required={true}
          placeholder="First Name"
          inputRef={userfNameInput}
        />
        <Input
          type="text"
          name="lName"
          required={true}
          placeholder="Last Name"
          inputRef={userlNameInput}
        />
        <Input
          type="email"
          name="input"
          required={true}
          placeholder="email"
          inputRef={userEmailInput}
        />
        <Input
          type="password"
          name="firstPassword"
          required={true}
          placeholder="firstPassword"
          inputRef={firstPassword}
        />
        <Input
          type="password"
          name="secondPassword"
          required={true}
          placeholder="secondPassword"
          inputRef={secondPassword}
        />
        <label for="male">Male</label>
        <Input type="radio" id="male" name="gender" onInput={onChooseGender} value="male" />
        <label for="female">Female</label>
        <Input type="radio" id="female" name="gender" onInput={onChooseGender} value="female" />

        <Button className = {style.Button_submit} text="register" type={"submit"}/>

        <p
          onClick={() => {
            navigate("/login");
          }}
          className={style.login}
        >
          login
        </p>
      </form>
    </div>
  );
}
