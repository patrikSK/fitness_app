import React from "react";

const RandomNumber = () => {
  const randomNum = Math.floor(Math.random() * 10);

  return (
    <div>
      <h1>{randomNum}</h1>
    </div>
  );
};

export default RandomNumber;
