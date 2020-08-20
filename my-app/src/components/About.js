import React from "react";

export default function About() {
  console.log("re-renders");

  return (
    <div className="about_section">
      <p>
        Check out my Github repo which explains how Conway's Game of Life works:{" "}
        <a
         target="_blank"
         rel="noreferrer noopener"
         href="https://github.com/Catherinesjkim/Conways-Game-of-Life/blob/master/README.md"
        >
          How I implemented Conway's Game of Life Blinker with Go
        </a>
      </p>

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