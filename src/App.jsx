import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let timeCounter;

    if (isActive) {
      timeCounter = setInterval(() => {
        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);
        } else {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    }

    return () => clearInterval(timeCounter);
  }, [isActive, seconds]);

  const restart = () => {
    setSeconds(0);
    setMinutes(0);
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
  };

  const start = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      stop();
    }
  };

  const updateTimer = () => {
    if (minutes >= 0 && seconds >= 0 && minutes <= 59 && seconds <= 59) {
      setIsActive(true);
      setIsEditing(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prevEditing) => !prevEditing);
  };

  return (
    <div className="container">
      <div className="timer">
        <h1>Timer</h1>
        <h4>
          {isEditing ? (
            <>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value))}
                min="0"
                max="59"
              />
              minutes
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value))}
                min="0"
                max="59"
              />
              seconds
            </>
          ) : (
            <h3>
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </h3>
          )}
        </h4>
        <div>
          {isEditing ? (
            <button onClick={updateTimer} id="updateTimer">
              Update Timer
            </button>
          ) : (
            <>
              <button onClick={toggleEdit} id="edit">
                Edit
              </button>
              <button onClick={restart} id="restart">
                Restart
              </button>
              <button onClick={start} id="active-OR-NOT">
                {isActive ? "Stop" : "Start"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
