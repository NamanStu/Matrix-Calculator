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
            onChange={(e) => onChange(r, c, parseFloat(e.target.value) || 0)}
            className={`w-12 h-12 text-center rounded-md text-black ${inputColor}`}
          />
        ))
      )}
    </div>
  );
};

const InverseMatrix = () => {
  const [matrixdim, setmatrixdim] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [matrix, setMatrix] = useState([
    [1, 0],
    [0, 1],
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
    const matrixAllZeros = matrix.every(row => row.every(val => val === 0));
    if (matrixAllZeros) {
      alert("Error: Matrix cannot be all zeros. Please enter valid matrix values.");
      return;
    }

    // Validate that matrix is not identity-like (check for at least some off-diagonal values)
    const hasOffDiagonal = matrix.some((row, i) => 
      row.some((val, j) => i !== j && val !== 0)
    );
    
    if (!hasOffDiagonal && matrix.every((row, i) => row.every((val, j) => i === j ? val !== 0 : val === 0))) {
      // This is fine - it's a diagonal matrix, can still have an inverse
    }

    try {
      setLoading(true);
      const res = await fetch("/api/inverse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix }),
      });

      const data = await res.json();
      if (data.error) {
        alert("Error: " + data.error);
        setResult(null);
        return;
      }
      if (!res.ok) {
        alert("Error: " + (data.error || "Unknown error"));
        setResult(null);
        return;
      }
      setResult(data.inverse);
    } catch (err) {
      console.error(err);
      alert("Error calculating inverse");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const ResultMatrix = ({ inverse }) => {
    if (!inverse || !Array.isArray(inverse)) {
      return null;
    }
    return (
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Inverse Matrix:</h3>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixdim}, 4rem)` }}>
          {inverse.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
              {row.map((value, colIndex) => {
                // Display as integer if it's a whole number
                const displayValue = Number.isInteger(value) ? value : value.toFixed(3);
                return (
                  <div
                    key={colIndex}
                    className="h-12 flex items-center justify-center bg-gray-700 rounded-md text-sm"
                  >
                    {displayValue}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-screen grid grid-cols-[55vw_20vw] bg-[#676569]">
      <div className="mainwindow bg-[#424143] mt-[7vh] ml-2 rounded-2xl">
        <h1 className="text-3xl flex justify-center mt-7 font-bold">
          Matrix Inverse Calculator
        </h1>
        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-10">
          Calculate the inverse of a square matrix online for free. The matrix inverse is computed using Gaussian elimination with partial pivoting, which transforms the matrix to its reduced row echelon form.
        </p>

        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-3">
          Have questions? Read the instructions.
        </p>

        <div className="text-[15px] text-[#B5B5B5] m-10 mt-7">
          <h2 className="text-[17px] font-semibold mt-2">About the method</h2>

          <p className="text-[15px] text-[#B5B5B5] my-2">
            To calculate a matrix inverse you need to do the following steps.
          </p>

          <ol className="list-decimal list-inside mx-7 space-y-1">
            <li>The matrix must be square (same number of rows and columns).</li>
            <li>The determinant of the matrix must be non-zero (matrix must be invertible).</li>
            <li>Use Gaussian elimination to transform the matrix to identity matrix while applying the same operations to an identity matrix.</li>
            <li>The resulting matrix from step 3 is the inverse of the original matrix.</li>
          </ol>

          <p className="text-[15px] text-[#B5B5B5] mt-3">
            To understand matrix inverse calculation better input any example and examine the solution.
          </p>

          <h2 className="text-[17px] font-semibold mt-5">Key Principles</h2>

          <h3 className="text-[16px] font-semibold underline mt-3">Property 1: Invertibility</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">A matrix is invertible if and only if its determinant is non-zero. Singular matrices (determinant = 0) do not have an inverse.</p>

          <h3 className="text-[16px] font-semibold underline mt-3">Property 2: Identity Matrix</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">If A is a matrix and A⁻¹ is its inverse, then A × A⁻¹ = A⁻¹ × A = I (identity matrix).</p>

          <h3 className="text-[16px] font-semibold underline mt-3">Property 3: Uniqueness</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">Every invertible matrix has exactly one inverse. The inverse is unique.</p>
        </div>

        <div className="bg-[#424143] flex gap-5 p-6 mt-10 rounded-md border border-gray-600 text-white max-w-xl mx-auto">
          <div>
            <div className="flex items-center mt-2 gap-20 justify-between mb-6">
              <label className="font-medium">Matrix dimension (NxN):</label>
              <input
                type="number"
                min="1"
                max="10"
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
                className="bg-[#424143] ml-4 hover:bg-gray-600 px-4 py-2 rounded-md text-white font-semibold border border-gray-500"
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

              {result !== null && <ResultMatrix inverse={result} />}

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-500 px-6 py-2 rounded-md font-semibold"
                >
                  {loading ? "Calculating..." : "Calculate Inverse"}
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
      <div className="ads max-w-[25vw] min-h-screen "></div>
      
    </main>
  );
};

export default InverseMatrix;