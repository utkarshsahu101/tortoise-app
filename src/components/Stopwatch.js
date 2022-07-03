import React, { useEffect, useState } from "react";

const Stopwatch = ({ start, stop, ...props }) => {
  const [watch, setWatch] = useState({
    running: false,
    currentTimeMs: 0,
    currentTimeSec: 0,
    currentTimeMin: 0,
  });

//   useEffect(() => {
//     string.length === 1 && setWatch({ ...watch, running: true });
//   }, [string]);

//   useEffect(() => {
//     stop && setWatch({ ...watch, running: false });
//   }, [stop]);

  useEffect(() => {
    console.log(watch);
  }, [watch]);

  useEffect(() => {
    start && startFunc()
  }, [])

  const startFunc = () => {
    if (!watch.running) {
      setWatch({ ...watch, running: true });
      const watch = setInterval(() => pace(), 10);
    }
  };

  const stopFunc = () => {
    setWatch({ ...watch, running: false });
    clearInterval(watch);
  };

  const pace = () => {
    setWatch({ ...watch, currentTimeMs: watch.currentTimeMs + 10 });
    if (watch.currentTimeMs >= 1000) {
      setWatch({ ...watch, currentTimeSec: watch.currentTimeSec + 1 });
      setWatch({ ...watch, currentTimeMs: 0 });
    }
    if (watch.currentTimeSec >= 60) {
      setWatch({ ...watch, currentTimeMin: watch.currentTimeMin + 1 });
      setWatch({ ...watch, currentTimeSec: 0 });
    }
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      {/* <StopwatchDisplay
        ref="display"
        {...this.state}
        formatTime={this.formatTime}
      /> */}
    </div>
  );
};

export default Stopwatch;
