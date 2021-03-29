import React from "react";

export default function About() {
  console.log("re-renders");

  return (
    <div className="about_section">
      <h1>
        Check out my Github repo!:{" "}
        <a
         target="_blank"
         rel="noreferrer noopener"
         href="https://github.com/Catherinesjkim/Conways-Game-of-Life/blob/master/README.md"
        >
          Implementation of Blinker with Go
        </a>
      </h1>

      <p>
        Learn more about Conway's Game of Life:{" "}
        <a
          target="_blank"
          rel="noreferrer noopener" 
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        >
          Conway's Game of Life on Wikipedia
        </a>
      </p>
    </div>
  )
}