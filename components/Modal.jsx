"use client";
import { useState } from "react";
import MatrixInput from "./components/MatrixInput";

export default function Page() {
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);

  const handleSubmit = async () => {
    const response = await fetch("/api/compute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matrixA, matrixB }),
    });
    const result = await response.json();
    alert("Result matrix: " + JSON.stringify(result));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Matrix Multiplication Hey my name is naman</h1>

      <div className="flex gap-8">
        <MatrixInput
          title="Matrix A Input"
          rows={rowsA}
          cols={colsA}
          onChange={setMatrixA}
        />
        <MatrixInput
          title="Matrix B Input"
          rows={rowsB}
          cols={colsB}
          onChange={setMatrixB}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-yellow-500 text-black rounded-lg mt-6 hover:bg-yellow-400"
      >
        Multiply
      </button>
    </div>
  );
}