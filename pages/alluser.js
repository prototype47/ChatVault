import React, { useState, useEffect, useContext } from "react";
import Style from "../styles/alluser.module.css";
import { UserCard } from "../Components/index";
import { ChatAppContext } from "../Context/ChatAppContext";

const alluser = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Find your friends</h1>
      </div>
      <div className={Style.alluser}>
        {userLists.map((ele, i) => {
          <UserCard key={i + 1} ele={ele} i={i} addFriends={addFriends} />
        })}
      </div>
    </div>
  );
};

export default alluser;
