import React, { useEffect, useRef, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charactersLength = characters.length;

const Task2 = () => {
  const [wholeString, setWholeString] = useState([]);
  const [randomList, setRandomList] = useState([]);
  const [index, setIndex] = useState(0);
  const highestTime = Number(localStorage.getItem("highest"));

  //   time
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      //   console.log(highestTime);
      // if (!highestTime) localStorage.setItem("highest", time);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const getRandomAlphabets = () => {
    let randomAlphabet = characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
    return randomAlphabet;
  };

  const list = () => {
    let list = [];
    for (let i = 0; i < 5; i++) {
      list.push(getRandomAlphabets());
    }
    setRandomList(list);
  };

  useEffect(() => {
    list();
  }, []);

  useEffect(() => {
    console.log(randomList);
  }, [randomList]);

  return (
    <div className="App">
      <div>{randomList[index]}</div>
      <div className="numbers">
        <span>Time: {Math.floor(time / 1000)}</span>.
        <span>{("00" + (time % 1000)).slice(-3)}s</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          value={wholeString}
          onChange={(e) => {
            let upper = e.target.value.toUpperCase();
            console.log(
              upper,
              index,
              randomList[index],
              randomList[index] === upper[upper.length - 1]
            );
            if (upper.length === 1) setRunning(true);
            if (index === 4) {
              setRunning(false);
            }
            if (randomList[index] === upper[upper.length - 1])
              setIndex(index + 1);
            else setTime((prevTime) => prevTime + 0.5 * 1000);
            setWholeString(upper);
          }}
        />

        <button
          onClick={() => {
            // if (wholeString.length > 0) {
            setWholeString([]);
            setRandomList([]);
            setIndex(0);
            setTime(0);
            setRunning(false);
            list();
            // }
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Task2;
