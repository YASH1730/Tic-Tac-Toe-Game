import { useEffect, useState } from "react";


export default function Boxes({ len }) {
    //   &#128308; circle
    //   &#x274C; cross
    let [sign, setSign] = useState(true);
    let [result, setResult] = useState({
      d1: 0,
      d2: 0,
    });
    let row = 0;
    let col = -1;
    useEffect(() => {}, [len]);
    let boxes = Array(len * len).fill("Y");
    let boxContainer = {
      width: "fit-content",
      margin: "auto",
      display: "grid",
      justifyContent: "center",
      alignItems: "center",
      gridTemplateColumns: `repeat(${len}, 50px)`,
    };
    function handleSign(i) {
      const span = document.getElementById(i);
      const label = document.getElementById("label");
  
      span.innerHTML = sign ? "<span>&#x274C;</span>" : "<span>&#128308;</span>";
      setSign(!sign);
  
      // update label
      label.innerText = sign ? "O's turn" : "X's turn";
  
      // set result
      let row = parseInt(i.split("_")[0]);
      let col = parseInt(i.split("_")[1]);
      let temp = {};
      if (sign)
        temp = {
          ...result,
          [`r_${row}`]:
            result?.[`r_${row}`] !== undefined ? result?.[`r_${row}`] + 1 : 1,
          [`c_${col}`]:
            result?.[`c_${col}`] !== undefined ? result?.[`c_${col}`] + 1 : 1,
        };
      else
        temp = {
          ...result,
          [`r_${row}`]:
            result?.[`r_${row}`] !== undefined ? result?.[`r_${row}`] - 1 : -1,
          [`c_${col}`]:
            result?.[`c_${col}`] !== undefined ? result?.[`c_${col}`] - 1 : -1,
        };
  
      //check for diagonal
      if (row + col === len - 1)
        temp = { ...temp, d2: sign ? temp.d2 + 1 : temp.d2 - 1 };
      if (row === col) temp = { ...temp, d1: sign ? temp.d1 + 1 : temp.d1 - 1 };
  
      setResult({ ...temp });
      checkResult(temp);
    }
  
    function checkResult(result) {
      const label = document.getElementById("label");
      const sheet = document.getElementById("sheet");
      
      for (const key in result) {
        if (Object.hasOwnProperty.call(result, key)) {
          const element = result[key];
          if (element === len) {
            label.innerText = "X is wins.";
            sheet.classList.add("cover")
          }
          if (element === -len) {
            label.innerText = "O is wins.";
            sheet.classList.add("cover")
          }
        }
      }
    }
    function getRowCol() {
      if (col === len - 1) {
        row++;
        col = 0;
      } else col++;
      return { row, col };
    }
    return (
      <div id={"sheet"} style={boxContainer}>
        {boxes.map((_, index) => {
          let { row, col } = getRowCol();
          return (
            <div
              key={`${row}_${col}_box`}
              className="box"
              id={`${row}_${col}_box`}
              onClick={() => handleSign(`${row}_${col}_box`)}
            ></div>
          );
        })}
      </div>
    );
  }
  