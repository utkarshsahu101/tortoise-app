import React, { useEffect, useState } from "react";
import "../custom.css";

const Task = () => {
  const [wholeString, setWholeString] = useState([]);
  const [randomList, setRandomList] = useState([]);
  const [index, setIndex] = useState(0);
  const [success, setSuccess] = useState(false);
  const besttimer = Number(localStorage.getItem("bestTimer"));
  const range = 20

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const charactersLength = characters.length;

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
      if (besttimer && time < besttimer && index === range)
        localStorage.setItem("bestTimer", time);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const getRandomAlphabets = () => {
    let i = Math.floor(Math.random() * charactersLength);
    let randomAlphabet = characters[i];
    characters.splice(1, randomAlphabet);
    return randomAlphabet;
  };

  const list = () => {
    let list = [];
    for (let i = 0; i < range; i++) {
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
      if (index === range && time < besttimer) {
        setSuccess(true);
      } else setSuccess(false);
    }
  }, [index]);

  return (
    <div className="App" style={{ height: "100vh" }}>
      <div style={{ fontSize: "1.8rem", padding: "12px" }}>
        Type the Alphabet
      </div>
      <p style={{ margin: "10px" }}>
        Typing game to see how fast you type. Timer starts when you do :)
      </p>
      <div className="randomLetter" style={{ borderRadius: "6px" }}>
        <h1>
          {index <= (range-1) ? randomList[index] : success ? "success" : <span style={{color: 'red'}}>failure</span>}
        </h1>
      </div>
      <div style={{ margin: "25px 10px" }}>
        <div>
          <span>Time: {Math.floor(time / 1000)}</span>.
          <span>{("00" + (time % 1000)).slice(-3)}s</span>
        </div>
        {besttimer !== Number.MAX_SAFE_INTEGER && (
          <div>
            <span>my best time: {Math.floor(besttimer / 1000)}</span>.
            <span>{("00" + (besttimer % 1000)).slice(-3)}s!</span>
          </div>
        )}
      </div>
      <div className="footer" style={{width: '100vw'}}>
        <input
          className="inputbox"
          placeholder="Type here"
          value={wholeString}
          onChange={(e) => {
            let upper = e.target.value.toUpperCase();
            if (upper.length === 1) setRunning(true);
            if (index === range-1) {
              setRunning(false);
            }
            if (randomList[index] === upper[upper.length - 1])
              setIndex(index + 1);
            else setTime((prevTime) => prevTime + 0.5 * 1000);
            setWholeString(upper);
          }}
        />
        <button
          className="resetbtn"
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

export default Task;
