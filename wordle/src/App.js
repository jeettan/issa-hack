import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [currentLetter, changeCurrentLetter] = useState("");
  const [first, changeFirst] = useState("");
  const [second, changeSecond] = useState("");
  const [third, changeThird] = useState("");
  const [fourth, changeFourth] = useState("");
  const [fifth, changeFifth] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const [firstRowColor, changeFirstRowColor] = useState([]);
  const [secondRowColor, changeSecondRowColor] = useState([]);
  const [thirdRowColor, changeThirdRowColor] = useState([]);
  const [fourthRowColor, changeFourthRowColor] = useState([]);
  const [fifthRowColor, changeFifthRowColor] = useState([]);

  const [firstRow, changeFirstRow] = useState([]);
  const [secondRow, changeSecondRow] = useState([]);
  const [thirdRow, changeThirdRow] = useState([]);
  const [fourthRow, changeFourthRow] = useState([]);
  const [fifthRow, changeFifthRow] = useState([]);

  const [enterPressedd, setEnterPressedd] = useState(false);

  const [state, changeState] = useState("Welcome to Jeet's Wordle");
  const [column, setColumn] = useState(0);
  const [position, changePosition] = useState(0);

  const submitGuess = async (input) => {

    try {

      const response = await fetch('http://127.0.0.1:5000/validate_guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      })

      const data = await response.json();

      let count = 0;

      for (let i = 0; i < data['result'].length; i++) {

        if (data['result'][i] === "green") {

          count++;

        }
      }

      if (count === 5) {

        setGameOver(true);

      }

      if (column === 1) {

        changeFirstRowColor(data['result'])
      }

      if (column === 2) {

        changeSecondRowColor(data['result'])
      }

      if (column === 3) {

        changeThirdRowColor(data['result'])
      }

      if (column === 4) {

        changeFourthRowColor(data['result'])
      }

      if (column === 5) {

        changeFifthRowColor(data['result'])
      }

      return data;

    } catch (err) {

      console.log(err)

    }
  }

  const enterPressed = (event) => {

    setEnterPressedd(true);
    setColumn((prev) => prev + 1);

  }

  const handleKeyDown = (event) => {

    let key = event.key;

    if (event.key === "Backspace") {

      changePosition((prev) => prev - 1);
      changeCurrentLetter("");
      return;
    }

    if (event.key === "Meta" || event.key === "Alt" || event.key === "Control" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Shift" | event.key === "CapsLock" || event.key === "Tab") {

      return;
    }

    if (event.key === 'Enter') {

      enterPressed();
      return;

    }

    if (((key >= 'a' && key <= 'z') || (key >= 'A' && key <= 'Z'))) {

      changePosition((prev) => prev + 1);
      changeCurrentLetter(event.key.toLowerCase());

    }
  }

  useEffect(() => {

    if (position === -1) {

      changePosition(0);
      return;
    }

    if (position === 6) {

      changePosition(5);
      return;
    }

    if (position === 4 && fifth !== "") {

      changeFifth("");
      return
    }

    if (position === 3 && fourth !== "") {

      changeFourth("");
      return;
    }

    if (position === 2 && third !== "") {

      changeThird("");
      return;
    }

    if (position === 1 && second !== "") {

      changeSecond("");
      return;
    }

    if (position === 0 && first !== "") {

      changeFirst("");
      return;
    }

    if (position === 1) {

      changeFirst(currentLetter);
      return;

    } else if (position === 2) {

      changeSecond(currentLetter);
      return;

    } else if (position === 3) {

      changeThird(currentLetter);
      return;

    } else if (position === 4) {

      changeFourth(currentLetter);
      return;

    } else if (position === 5) {

      changeFifth(currentLetter);
      return;
    }

  }, [position])

  useEffect(() => {

    if ((!first || !second || !third || !fourth || !fifth) && enterPressedd === true) {

      changeState("Error. Please enter five letters");

      setEnterPressedd(false);
      setColumn((prev) => prev - 1);
      return;

    }

    if (column === 1 && enterPressedd === true) {

      changeFirstRow([first, second, third, fourth, fifth]);
      submitGuess([first, second, third, fourth, fifth]);
      changePosition(0);
      changeFirst("");
      changeSecond("");
      changeThird("");
      changeFourth("");
      changeFifth("");
      changeState("You entered: " + first + second + third + fourth + fifth);

    }

    if (column === 2 && enterPressedd === true) {

      changeSecondRow([first, second, third, fourth, fifth]);
      submitGuess([first, second, third, fourth, fifth]);
      changePosition(0);
      changeFirst("");
      changeSecond("");
      changeThird("");
      changeFourth("");
      changeFifth("");

      changeState("You entered: " + first + second + third + fourth + fifth);
    }

    if (column === 3 && enterPressedd === true) {

      changeThirdRow([first, second, third, fourth, fifth]);
      submitGuess([first, second, third, fourth, fifth]);
      changePosition(0);
      changeFirst("");
      changeSecond("");
      changeThird("");
      changeFourth("");
      changeFifth("");

      changeState("You entered: " + first + second + third + fourth + fifth);
    }

    if (column === 4 && enterPressedd === true) {

      changeFourthRow([first, second, third, fourth, fifth]);
      submitGuess([first, second, third, fourth, fifth]);
      changePosition(0);
      changeFirst("");
      changeSecond("");
      changeThird("");
      changeFourth("");
      changeFifth("");

      changeState("You entered: " + first + second + third + fourth + fifth);
    }

    if (column === 5 && enterPressedd === true) {

      changeFifthRow([first, second, third, fourth, fifth]);
      submitGuess([first, second, third, fourth, fifth]);
      changePosition(0);
      changeFirst("");
      changeSecond("");
      changeThird("");
      changeFourth("");
      changeFifth("");
      changeState("You entered: " + first + second + third + fourth + fifth);
    }

  }, [column])

  useEffect(() => {

    document.addEventListener('keydown', handleKeyDown);

  }, [])

  useEffect(() => {

    if (gameOver) {

      document.removeEventListener("keydown", handleKeyDown);
      changeState("Correct answer!");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };

  }, [gameOver])


  return (

    <div className="App">
      <div className="row">
        <div className="box" id={firstRowColor[0]}>{firstRow[0] ? firstRow[0] : first}</div>
        <div className="box" id={firstRowColor[1]}>{firstRow[1] ? firstRow[1] : second}</div>
        <div className="box" id={firstRowColor[2]}>{firstRow[2] ? firstRow[2] : third}</div>
        <div className="box" id={firstRowColor[3]}>{firstRow[3] ? firstRow[3] : fourth}</div>
        <div className="box" id={firstRowColor[4]}>{firstRow[4] ? firstRow[4] : fifth}</div>
      </div>
      <div className="row">
        <div className="box" id={secondRowColor[0]}> {secondRow[0] ? secondRow[0] : column === 1 ? first : ""}</div>
        <div className="box" id={secondRowColor[1]}> {secondRow[1] ? secondRow[1] : column === 1 ? second : ""} </div>
        <div className="box" id={secondRowColor[2]}> {secondRow[2] ? secondRow[2] : column === 1 ? third : ""}</div>
        <div className="box" id={secondRowColor[3]}> {secondRow[3] ? secondRow[3] : column === 1 ? fourth : ""}</div>
        <div className="box" id={secondRowColor[4]}> {secondRow[4] ? secondRow[4] : column === 1 ? fifth : ""}</div>
      </div>
      <div className="row">
        <div className="box" id={thirdRowColor[0]}>{thirdRow[0] ? thirdRow[0] : column === 2 ? first : ""}</div>
        <div className="box" id={thirdRowColor[1]}>{thirdRow[1] ? thirdRow[1] : column === 2 ? second : ""}</div>
        <div className="box" id={thirdRowColor[2]}>{thirdRow[2] ? thirdRow[2] : column === 2 ? third : ""} </div>
        <div className="box" id={thirdRowColor[3]}>{thirdRow[3] ? thirdRow[3] : column === 2 ? fourth : ""}</div>
        <div className="box" id={thirdRowColor[4]}>{thirdRow[4] ? thirdRow[4] : column === 2 ? fifth : ""} </div>
      </div>
      <div className="row">
        <div className="box" id={fourthRowColor[0]}>{fourthRow[0] ? fourthRow[0] : column === 3 ? first : ""}</div>
        <div className="box" id={fourthRowColor[1]}>{fourthRow[1] ? fourthRow[1] : column === 3 ? second : ""} </div>
        <div className="box" id={fourthRowColor[2]}> {fourthRow[2] ? fourthRow[2] : column === 3 ? third : ""}</div>
        <div className="box" id={fourthRowColor[3]}>{fourthRow[3] ? fourthRow[3] : column === 3 ? fourth : ""} </div>
        <div className="box" id={fourthRowColor[4]}>{fourthRow[4] ? fourthRow[4] : column === 3 ? fifth : ""} </div>
      </div>
      <div className="row">
        <div className="box" id={fifthRowColor[0]}> {fifthRow[0] ? fifthRow[0] : column === 4 ? first : ""}</div>
        <div className="box" id={fifthRowColor[1]}> {fifthRow[1] ? fifthRow[1] : column === 4 ? second : ""}</div>
        <div className="box" id={fifthRowColor[2]}> {fifthRow[2] ? fifthRow[2] : column === 4 ? third : ""}</div>
        <div className="box" id={fifthRowColor[3]}>{fifthRow[3] ? fifthRow[3] : column === 4 ? fourth : ""} </div>
        <div className="box" id={fifthRowColor[4]}> {fifthRow[4] ? fifthRow[4] : column === 4 ? fifth : ""}</div>
      </div>

      <div>{state}</div>
    </div>
  );
}

export default App;
