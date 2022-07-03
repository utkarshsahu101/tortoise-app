import React, { useEffect, useRef, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charactersLength = characters.length;

const Task = () => {
  const [randomAlphabet, setRandomAlphabet] = useState("");
  const [enteredAlphabet, setEnteredAlphabet] = useState("");
  const [countTime, setCountTime] = useState(0);
  const [wholeString, setWholeString] = useState([]);

  const getRandomAlphabet = () => {
    let randomAlphabet = characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
    return randomAlphabet;
  };

  useEffect(() => {
    // setRandomAlphabet(getRandomAlphabet());
  }, []);

//   useEffect(() => {
//     function handleKeyDown(e) {
//       const key = String.fromCharCode(e.keyCode);
//       if (characters.includes(key)) {
//         setEnteredAlphabet(key);
//       }
//     }

//     document.addEventListener("keydown", handleKeyDown);

//     return function cleanup() {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   useEffect(() => {
//     if (wholeString.length <= 5) {
//       if (enteredAlphabet === randomAlphabet) {
//         setWholeString([...wholeString, enteredAlphabet]);
//         setRandomAlphabet(getRandomAlphabet());
//       }
//     }
//   }, [enteredAlphabet]);

  return (
    <div className="App">
      <div>{randomAlphabet}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>{wholeString.join("")}</div>
        <button>Reset</button>
      </div>
    </div>
  );
};

export default Task;
