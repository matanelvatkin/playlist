import style from "./style.module.css";

import React, { useContext } from "react";
import { userContext } from "../../App";

export default function Profile() {
  const { user } = useContext(userContext);
  return (
    <div>
      <p>First Name: {user.fName}</p>
      <p>Last Name: {user.lName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
