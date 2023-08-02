import React, { useState, useContext } from "react";
import Image from "next/image";
import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppContext } from "../../Context/ChatAppContext";
import { Loader } from "../../Components/index";

const Model = ({
  openModel,
  title,
  head,
  info,
  smallInfo,
  images,
  functionName
}) => {
  // USESTATES
  const [name, setName] = useState("");
  return <div>Model</div>;
};

export default Model;
