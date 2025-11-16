"use client";
import { useState } from "react";
import React from "react";

const MatrixInput = ({ matrixSize, values, onChange, inputColor = "bg-black" }) => {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${matrixSize}, 3rem)` }}
    >
      {Array.from({ length: matrixSize }).map((_, r) =>
        Array.from({ length: matrixSize }).map((_, c) => (
          <input
            key={`${r}-${c}`}
            type="number"
            value={values?.[r]?.[c] ?? 0}
            onChange={(e) => onChange(r, c, Number(e.target.value))}
            className={`w-12 h-12 text-center rounded-md text-black ${inputColor}`}
          />
        ))
      )}
    </div>
  );
};

const Determinant = () => {
  const [matrixdim, setmatrixdim] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [matrix, setMatrix] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDimensionChange = (value) => {
    const n = Number(value);
    setmatrixdim(n);

    const newMatrix = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => 0)
    );
    setMatrix(newMatrix);
    setResult(null);
  };

  const handleMatrixInput = (row, col, value) => {
    const updated = matrix.map((r) => r.slice());
    updated[row][col] = value;
    setMatrix(updated);
  };

  const handleCalculate = async () => {
    // Validate that matrix is not all zeros
    const matrixAllZeros = matrix.every((row) => row.every((val) => val === 0));
    if (matrixAllZeros) {
      alert("Error: Matrix cannot be all zeros. Please enter valid matrix values.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/determinant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        alert("Error: " + (data.error || "Unknown error"));
        setResult(null);
        return;
      }
      setResult(data.determinant);
    } catch (err) {
      console.error(err);
      alert("Error calculating determinant");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-screen grid grid-cols-[55vw_20vw] bg-[#676569]">
      <div className="mainwindow bg-[#424143] mt-[7vh] ml-2 rounded-2xl">
        <h1 className="text-3xl flex justify-center mt-7 font-bold">
          Determinant Calculator
        </h1>
        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-10">
          Here you can calculate a determinant of a matrix with complex numbers
          online for free with a very detailed solution. Determinant is calculated
          by reducing a matrix to row echelon form and multiplying its main
          diagonal elements.
        </p>

        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-3">
          Have questions? Read the instructions.
        </p>

        <div className="text-[15px] text-[#B5B5B5] m-10 mt-7">
          <h2 className="text-[17px] font-semibold mt-2">About the method</h2>

          <p className="text-[15px] text-[#B5B5B5] my-2 ">
            To calculate a determinant you need to do the following steps.
          </p>

          <ol className="list-decimal list-inside mx-7 space-y-1">
            <li>Set the matrix (must be square).</li>
            <li>
              Reduce this matrix to row echelon form using elementary row
              operations so that all the elements below diagonal are zero.
            </li>
            <li>
              Multiply the main diagonal elements of the matrix - determinant is
              calculated.
            </li>
          </ol>

          <p className="text-[15px] text-[#B5B5B5] mt-3 ">
            To understand determinant calculation better input any example,
            choose "very detailed solution" option and examine the solution.
          </p>
        </div>

        <div className="bg-[#424143] flex gap-5 p-6 mt-10 rounded-md border border-gray-600 text-white max-w-xl mx-auto">
          <div>
            <div className="flex items-center mt-2 gap-20 justify-between mb-6">
              <label className="font-medium">Matrix dimension (NxN):</label>
              <input
                type="number"
                min="1"
                value={matrixdim}
                onChange={(e) => handleDimensionChange(Number(e.target.value))}
                className="w-16 text-center rounded-md bg-white text-black py-1"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#424143]  ml-4 hover:bg-gray-600 px-4 py-2 rounded-md text-white font-semibold border border-gray-500"
              >
                Set Matrix
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-60 backdrop-blur-[8px] gap-10 flex flex-col items-center justify-center z-50">
            <div className="bg-[#424143] text-white p-8 rounded-2xl shadow-lg max-w-4xl">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Enter Matrix Values
              </h2>

              <div className="flex justify-center mb-6">
                <MatrixInput
                  matrixSize={matrixdim}
                  values={matrix}
                  onChange={handleMatrixInput}
                  inputColor="bg-white"
                />
              </div>

              {result !== null && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Determinant:</h3>
                  <div className="text-2xl font-bold">
                    {typeof result === "number"
                      ? result.toFixed(3)
                      : result}
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-500 px-6 py-2 rounded-md font-semibold"
                >
                  {loading ? "Calculating..." : "Calculate"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="ads max-w-[25vw] min-h-screen"></div>
    </main>
  );
};

export default Determinant;