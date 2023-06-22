import React from "react";
import { NavLink } from "react-router-dom";
import avatar from "../../assets/images/avatar.svg";
import { useAuth } from "../../hooks/useAuth";
import { useUserData } from "../../hooks/useUserData";
import style from "./Avatar.module.scss";

function Avatar({ dropDownHandler }) {
  const userData = useUserData();
  const isAuth = useAuth();

  if (isAuth)
    return (
      <div className={`${style.profile_avater} `} onClick={dropDownHandler}>
        <img src={userData?.picture} alt="avatar" />
      </div>
    );

  if (!isAuth)
    return (
      <div className={`${style.avatar} `}>
        <NavLink to={"/login"}>
          <img src={avatar} alt="avatar" />
        </NavLink>
      </div>
    );
}

export default Avatar;
