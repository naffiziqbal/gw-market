import React from "react";
import avatar from "../../assets/images/avatar.svg";
import style from './Avatar.module.scss';

function Avatar() {
  return (
    <div className={`${style.avatar} ` }>
      <img src={avatar} alt="avatar"    />
    </div>
  );
}

export default Avatar;
