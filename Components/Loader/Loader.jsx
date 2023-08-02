import React from "react";
import Style from "./Loader.module.css";
import Image from "next/image";
import images from "../../assets";

const Loader = () => {
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <Image src={images.loader} alt="loader" height={100} width={100}/>
      </div>
    </div>
  );
};

export default Loader;
