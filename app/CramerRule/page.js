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

const VectorInput = ({ size, values, onChange, label }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <div className="flex gap-2">
        {Array.from({ length: size }).map((_, i) => (
          <input
            key={i}
            type="number"
            value={values?.[i] ?? 0}
            onChange={(e) => onChange(i, parseFloat(e.target.value) || 0)}
            className="w-12 h-12 text-center rounded-md bg-white text-black"
          />
        ))}
      </div>
    </div>
  );
};

const CramerRule = () => {
  const [matrixdim, setmatrixdim] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [matrix, setMatrix] = useState([
    [1, 0],
    [0, 1],
  ]);
  const [vector, setVector] = useState([0, 0]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDimensionChange = (value) => {
    const n = Number(value);
    setmatrixdim(n);

    const newMatrix = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => 0)
    );
    const newVector = Array.from({ length: n }, () => 0);
    setMatrix(newMatrix);
    setVector(newVector);
    setResult(null);
  };

  const handleMatrixInput = (row, col, value) => {
    const updated = matrix.map((r) => r.slice());
    updated[row][col] = value;
    setMatrix(updated);
  };

  const handleVectorInput = (index, value) => {
    const updated = [...vector];
    updated[index] = value;
    setVector(updated);
  };

  const handleCalculate = async () => {
    // Validate that matrix is not all zeros
    const matrixAllZeros = matrix.every(row => row.every(val => val === 0));
    if (matrixAllZeros) {
      alert("Error: Coefficient matrix cannot be all zeros.\n\nPlease enter valid matrix values.");
      return;
    }

    // Validate that vector is not all zeros
    const vectorAllZeros = vector.every(val => val === 0);
    if (vectorAllZeros) {
      alert("Error: Constants vector cannot be all zeros.\n\nPlease enter valid constant values.");
      return;
    }

    // Validate that at least one value is entered
    const hasAnyValue = matrix.some(row => row.some(val => val !== 0)) || vector.some(val => val !== 0);
    if (!hasAnyValue) {
      alert("Error: Please enter at least some values in the matrix or vector.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/cramer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix, vector: vector }),
      });

      const data = await res.json();
      
      // Handle error response
      if (data.error) {
        let errorMessage = data.error;
        
        // Custom error message for zero determinant
        if (data.error.includes("zero") || data.error.includes("Determinant")) {
          errorMessage = "Determinant of the main matrix is zero.\n\nThis means that the system of linear equations is either inconsistent or has infinitely many solutions.\n\nGauss-Jordan elimination method will help get the complete answer.";
        }
        
        alert(errorMessage);
        setResult(null);
        return;
      }
      
      if (!res.ok) {
        alert("Error: " + (data.error || "Unknown error occurred while solving the system."));
        setResult(null);
        return;
      }
      
      setResult(data.solution);
    } catch (err) {
      console.error(err);
      alert("Error calculating solution:\n\n" + err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const ResultSolution = ({ solution }) => {
    if (!solution || !Array.isArray(solution)) {
      return null;
    }
    return (
      <div className="mt-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-center">Solution (x values):</h3>
        <div className="flex justify-center gap-2">
          {solution.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div className="text-sm text-gray-400 mb-1">x{index + 1}</div>
              <div className="w-16 h-12 flex items-center justify-center bg-gray-700 rounded-md">
                {typeof value === "number" ? value.toFixed(3) : value}
              </div>
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
          Cramer's Rule Solver
        </h1>
        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-10">
          Solve systems of linear equations using Cramer's Rule. This method uses determinants to find the solution of a system Ax = b, where A is a square matrix, x is the unknown vector, and b is the constant vector.
        </p>

        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-3">
          Have questions? Read the instructions.
        </p>

        <div className="text-[15px] text-[#B5B5B5] m-10 mt-7">
          <h2 className="text-[17px] font-semibold mt-2">About Cramer's Rule</h2>

          <p className="text-[15px] text-[#B5B5B5] my-2">
            Cramer's Rule is a mathematical theorem used to solve systems of linear equations with as many equations as unknowns.
          </p>

          <ol className="list-decimal list-inside mx-7 space-y-1">
            <li>The system must be square (n equations with n unknowns).</li>
            <li>The determinant of the coefficient matrix A must be non-zero.</li>
            <li>For each variable x_i, calculate the determinant of matrix A_i (where column i is replaced with vector b).</li>
            <li>Divide det(A_i) by det(A) to get the solution for x_i.</li>
          </ol>

          <p className="text-[15px] text-[#B5B5B5] mt-3">
            Formula: x_i = det(A_i) / det(A)
          </p>

          <h2 className="text-[17px] font-semibold mt-5">Key Requirements</h2>

          <h3 className="text-[16px] font-semibold underline mt-3">Square System</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">The number of equations must equal the number of unknowns.</p>

          <h3 className="text-[16px] font-semibold underline mt-3">Non-Zero Determinant</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">The determinant of the coefficient matrix must be non-zero for a unique solution to exist.</p>

          <h3 className="text-[16px] font-semibold underline mt-3">Unique Solution</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">If the determinant is non-zero, the system has exactly one solution.</p>
        </div>

        <div className="bg-[#424143] flex gap-5 p-6 mt-10 rounded-md border border-gray-600 text-white max-w-xl mx-auto">
          <div>
            <div className="flex items-center mt-2 gap-20 justify-between mb-6">
              <label className="font-medium">System dimension (NxN):</label>
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
                Solve System
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-60 backdrop-blur-[8px] gap-10 flex flex-col items-center justify-center z-50 overflow-y-auto py-10">
            <div className="bg-[#424143] text-white p-8 rounded-2xl shadow-lg max-w-4xl">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Enter System: Ax = b
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center">Coefficient Matrix (A)</h3>
                <div className="flex justify-center mb-6">
                  <MatrixInput
                    matrixSize={matrixdim}
                    values={matrix}
                    onChange={handleMatrixInput}
                    inputColor="bg-white"
                  />
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-center">
                  <VectorInput
                    size={matrixdim}
                    values={vector}
                    onChange={handleVectorInput}
                    label="Constants Vector (b)"
                  />
                </div>
              </div>

              {result !== null && <ResultSolution solution={result} />}

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-500 px-6 py-2 rounded-md font-semibold"
                >
                  {loading ? "Solving..." : "Solve"}
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

export default CramerRule;