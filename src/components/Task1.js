import React, { useEffect, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charactersLength = characters.length;

const Task1 = () => {
  const [randomAlphabet, setRandomAlphabet] = useState("");
  const [randomAlphabetCount, setRandomAlphabetCount] = useState(0);
  const [enteredAlphabet, setEnteredAlphabet] = useState("");
  const [wholeString, setWholeString] = useState([]);
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [resetStatus, setResetStatus] = useState(true);
  const [success, setSuccess] = useState(false);
  const highestTime = Number(localStorage.getItem("highest"));

  const getRandomAlphabet = () => {
    let randomAlphabet = characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
    setRandomAlphabetCount(randomAlphabetCount + 1);
    return randomAlphabet;
  };
  useEffect(() => {
    let interval;
    if (startTimer) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!startTimer) {
      if (!highestTime) localStorage.setItem("highest", time);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTimer]);

  useEffect(() => {
    if (randomAlphabetCount > 5) {
      setStartTimer(false);
      if (time < highestTime) {
        console.log('41');
        setSuccess(true)
        localStorage.setItem("highest", time);
      }
    }
  }, [randomAlphabetCount]);

  useEffect(() => {
    if (resetStatus) {
      setRandomAlphabet(getRandomAlphabet());
      setStartTimer(false);
    }
  }, [resetStatus]);

  return (
    <div className="App">
      <div>
        {randomAlphabetCount <= 5
          ? randomAlphabet
          : highestTime === 0
          ? "Success"
          : success
          ? "success"
          : "failure"}
      </div>
      <div className="stopwatch">
        <div className="numbers">
          <span>Time: {Math.floor(time / 1000)}</span>.
          <span>{("00" + (time % 1000)).slice(-3)}s</span>
        </div>
        {highestTime !== 0 && (
          <div>
            <span>my best time: {Math.floor(highestTime / 1000)}</span>.
            <span>{("00" + (highestTime % 1000)).slice(-3)}s!</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          autoFocus
          value={wholeString.join("")}
          onChange={(e) => {
            setWholeString([...wholeString, enteredAlphabet]);
          }}
          onKeyDown={(e) => {
            setEnteredAlphabet("");
            setResetStatus(false);
            let key = e.key.toUpperCase();
            if (characters.includes(key)) {
              setEnteredAlphabet(key);
              if (key === randomAlphabet && randomAlphabetCount <= 5) {
                setStartTimer(true);
                setRandomAlphabet(getRandomAlphabet());
              } else if (key !== randomAlphabet && randomAlphabetCount <= 5) {
                setTime((prevTime) => prevTime + 0.5 * 1000);
              }
            }
          }}
        />
        <button
          onClick={() => {
            if (wholeString.length > 0) {
              setRandomAlphabet("");
              setRandomAlphabetCount(0);
              setEnteredAlphabet("");
              setStartTimer(false);
              setTime(0);
              setWholeString([]);
              setResetStatus(true);
            }
          }}
        >
          Reset
        </button>
      </div>
      {randomAlphabetCount > 5 && <div>completed</div>}
    </div>
  );
};

export default Task1;
