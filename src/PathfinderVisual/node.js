import React from "react";

import "./node.css";

export default function Node(props) {
  let color = props.isFinish
  ?  "red"
  : props.isStart
  ? "green"
  : props.isWall
  ? "rgb(12, 53, 71)"
  : "";
  return (
    <div
      id={`node-${props.row}-${props.col}`}
      className={"node"}
      style={{ backgroundColor: color }}
      onMouseDown={() => props.onMouseDown(props.row, props.col)}
      onMouseEnter={() => props.onMouseEnter(props.row, props.col)}
      onMouseUp={() => props.onMouseUp(props.row, props.col)}
    ></div>
  );
}
