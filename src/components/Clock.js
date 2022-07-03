import React, { useCallback, useEffect, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charactersLength = characters.length;

const Clock = () => {
  const [availableAlphabetsArray, setAvailableAlphabetsArray] = useState([]);
  const [currentWordArray, setCurrentWordArray] = useState([]);
  const [wrongCount, setWrongCount] = useState(0);

  const getRandomAlphabet = () => {
    let randomAlphabet = characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
    return randomAlphabet;
  };
  const makeRequiredAlphabetArray = (length) => {
    let result = [];
    while (result.length < 20) {
      const randomAlphabet = getRandomAlphabet();
      if (!result.includes(randomAlphabet)) {
        result.push(randomAlphabet);
      }
    }
    setAvailableAlphabetsArray(result);
    // setAvailableAlphabetsArray("ABCDEFGHIJKLMNOPQRST".split("").map((e) => e));
  };

  useEffect(() => {
    makeRequiredAlphabetArray(20);
  }, []);

  useEffect(() => {
    wrongCount && console.log(wrongCount);
  }, [wrongCount]);

//   const checkAlphabetRepition = (alphabet) => {
//     console.log(currentWordArray, alphabet);
//     if (alphabet[1] && currentWordArray.includes(alphabet[1])) {
//       const randomAlphabet = getRandomAlphabet();
//       console.log("same", randomAlphabet);
//       while (checkAlphabetRepition(randomAlphabet)) {

//       }
//       return false;
//     } else {
//       return true;
//     }
//   };

  return (
    <div>
      <div>
        <input
          type={"text"}
          value={
            currentWordArray.length
              ? currentWordArray[currentWordArray.length - 1]
              : ""
          }
          onChange={(e) => {
            let uppercasevalue = e.target.value.toUpperCase();
            // console.log('uppercasevalue', uppercasevalue);
            // if (checkAlphabetRepition(uppercasevalue)) {
              if (
                uppercasevalue[1] &&
                !availableAlphabetsArray.includes(uppercasevalue[1])
              ) {
                setWrongCount(wrongCount + 1);
              }
              setCurrentWordArray([
                ...currentWordArray,
                uppercasevalue.slice(uppercasevalue.length - 1),
              ]);
            // }
          }}
        />
      </div>
      <div>
        <b>Current Word-:</b> {currentWordArray.join("")}
      </div>
      <div>
        <b>lenght-:</b> {availableAlphabetsArray.length}
        <b>Available-:</b> {availableAlphabetsArray.join("")}
      </div>
    </div>
  );
};

export default Clock;
