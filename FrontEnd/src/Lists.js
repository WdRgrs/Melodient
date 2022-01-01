import React, { useState } from "react";
import ToDo from "./ToDo";
import "./Lists.css";

const difColors = [
  "Aquamarine",
  "BlueViolet",
  "Chartreuse",
  "CornflowerBlue",
  "Thistle",
  "SpringGreen",
  "SaddleBrown",
  "PapayaWhip",
  "MistyRose",
];

export default function Lists() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [color, setColor] = useState("white");
  const todo = items.map((item, index) => (
    <ToDo key={index} id={index} item={item} onCheck={removeItem} />
  ));
  const divStyle = { backgroundColor: color };

  function addItem(e) {
    setItems((prevData) => {
      return [...prevData, input];
    });

    setInput("");
  }

  function removeItem(id) {
    setItems((prevData) => {
      return prevData.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <>
    <div>404 - Not found - But hey! At least there's a to-do list</div>
      <div style={divStyle} className="mainDiv">
        <p>ToDont List</p>
        <div className="inputDiv">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button onClick={addItem}>{"get F'd!"}</button>
        </div>
        <div>
          <ul>{todo}</ul>
        </div>
        <div className="btnClass">
          {difColors.map((difColor) => (
            <button
              className="colorBtn"
              onClick={() => setColor(difColor)}
              key={difColor}
            >
              {difColor}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
