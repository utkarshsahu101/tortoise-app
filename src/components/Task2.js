import React, { useEffect, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charactersLength = characters.length;

const Task2 = () => {
  const [wholeString, setWholeString] = useState([]);
  const [randomList, setRandomList] = useState([]);
  const [index, setIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const besttimer = Number(localStorage.getItem("bestTimer"));

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
      console.log(index);
      if (besttimer && time < besttimer && index === 5)
        localStorage.setItem("bestTimer", time);
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
    localStorage.setItem("bestTimer", Number.MAX_SAFE_INTEGER);
    list();
  }, []);

  useEffect(() => {
    if (besttimer === Number.MAX_SAFE_INTEGER) {
      setSuccess(true);
    } else {
      if (index === 5 && time < besttimer) {
        setSuccess(true);
      } else setSuccess(false);
    }
  }, [index]);

  return (
    <div className="App">
      <div>
        {index <= 4 ? randomList[index] : success ? "success" : "failure"}
      </div>
      <div className="numbers">
        <span>Time: {Math.floor(time / 1000)}</span>.
        <span>{("00" + (time % 1000)).slice(-3)}s</span>
      </div>
      {besttimer !== Number.MAX_SAFE_INTEGER && (
        <div>
          <span>my best time: {Math.floor(besttimer / 1000)}</span>.
          <span>{("00" + (besttimer % 1000)).slice(-3)}s!</span>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          value={wholeString}
          onChange={(e) => {
            let upper = e.target.value.toUpperCase();
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
            setWholeString([]);
            setRandomList([]);
            setIndex(0);
            setTime(0);
            setRunning(false);
            list();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Task2;
