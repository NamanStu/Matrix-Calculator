"use client";
import { useState, useEffect } from "react";

function MatrixInput({ title, rows, cols, onChange }) {
  const [matrix, setMatrix] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(""))
  );

  useEffect(() => {
    setMatrix(Array.from({ length: rows }, () => Array(cols).fill("")));
  }, [rows, cols]);

  const handleChange = (r, c, value) => {
    const newMatrix = matrix.map((row, i) =>
      row.map((cell, j) => (i === r && j === c ? value : cell))
    );
    setMatrix(newMatrix);
    onChange(newMatrix);
  };

  return (
    <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-2xl shadow-xl text-white w-fit">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(40px, 1fr))`,
        }}
      >
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val}
              onChange={(e) => handleChange(i, j, e.target.value)}
              className="w-12 h-10 bg-white/30 border border-white/40 text-center rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MatrixInput;