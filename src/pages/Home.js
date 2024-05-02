import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import Boxes from "../components/Boxes";
function Home() {
  let [len, setLength] = useState(3);
  return (
    <>
      <div className="container">
        <h1>Tic Tac Toe</h1>
        <h2 id="label">Start</h2>
        <Boxes len={len} />
        <label for = "len_input">Enter the Length of the sheet</label>
        <input
        id="len_input"
          type="number"
          placeholder="enter the len of the grid"
          value={len}
          onChange={(e) =>
            setLength(e.target.value > 0 ? parseInt(e.target.value) : 3)
          }
        />
      </div>
    </>
  );
}

export default Home;
