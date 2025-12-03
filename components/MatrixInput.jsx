"use client"; // This puts the page on the client side means on the frontend..
import { useState, useEffect } from "react";

function MatrixInput({ title, rows, cols, onChange }) {
  const [matrix, setMatrix] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );
  // This is creating the 2D matrix with empty spaces "" .

  useEffect(() => {
    setMatrix(Array.from({ length: rows }, () => Array(cols).fill("")));
  }, [rows, cols]);
  // This helps us to get a clear matrix input everytime we have to calculate, it refreshes the last inputs..

  const handleChange = (r, c, value) => {
    const newMatrix = matrix.map((row, i) =>
      row.map((cell, j) => (i === r && j === c ? value : cell))
    ); // This is creating a new matrix that contains all the new values and then changing it with the constant state defined..
    setMatrix(newMatrix);
    onChange(newMatrix); // On changing of the values it again repeats the above function again.
  };

  return (
    // This is the main block where we type the inputs..
    <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-2xl shadow-xl text-white w-fit">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(40px, 1fr))`,
        }} // This is styling..
      >
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`} // This gives us the unique key ij for every element.
              type="number"
              value={val}
              onChange={(e) => handleChange(i, j, e.target.value)}
              // The handleChange function is called everytime when the input changes...
              // This is provinding value of i, j and the value that is entered to the handleChange function..
              className="w-12 h-10 bg-white/30 border border-white/40 text-center rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MatrixInput;