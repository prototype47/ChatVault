import React, { useState, useContext } from "react";
import Image from "next/image";
import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Model } from "../index";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);
  // USESTATE
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            Clear Chat
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            Add Friend
          </button>
        </div>
      </div>
      {/* MODEL */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model openBox={setAddFriend} title="Welcome to " head="ChatVault" info="A decentralized P2P Chat Application"
            smallInfo="Kindly select your friend name and address" image={images.hero} functionName={addFriends}/>
        </div>
      )}
    </div>
  );
};

export default Filter;
