import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    console.log("getting bubbles");
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        console.log("response", res);
        setColorList(res.data);
      })
      .catch(err => console.log("bubbles not got rip", err.response));
  }, []);
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
