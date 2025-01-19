"use client";

import { useState, useEffect } from "react";
import { getContestData } from "./getContests";

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState("");

  // Extract `endTime` from `getContestData`
  const { endTime } = getContestData(); // Assuming it has `seconds` and `nanoseconds`

  // Convert `endTime` (seconds + nanoseconds) to a valid Date object
  const endDate = new Date(
    endTime.seconds * 1000 + Math.floor(endTime.nanoseconds / 1e6),
  );

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const difference = endDate - now; // Difference in milliseconds

      if (difference > 0) {
        const minutes = Math.floor(difference / 1000 / 60); // Minutes left
        const seconds = Math.floor((difference / 1000) % 60); // Seconds left
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Time's up!");
        clearInterval(timerInterval); // Stop the interval once the time is up
      }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer(); // Run immediately to avoid delay

    return () => clearInterval(timerInterval); // Cleanup interval on unmount
  }, [endDate]);

  return (
    <div>
      <h1>Time Left</h1>
      <p>{timeLeft}</p>
    </div>
  );
}
