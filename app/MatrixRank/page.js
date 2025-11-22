"use client";
import { useState } from "react";
import React from "react";

const MatrixInput = ({ rows, cols, values, onChange, inputColor = "bg-black" }) => {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, 3rem)` }}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
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

const MatrixRank = () => {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [matrix, setMatrix] = useState([
    [1, 0],
    [0, 1],
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRowsChange = (value) => {
    const n = Number(value);
    setRows(n);
    const newMatrix = Array.from({ length: n }, () =>
      Array.from({ length: cols }, () => 0)
    );
    setMatrix(newMatrix);
    setResult(null);
  };

  const handleColsChange = (value) => {
    const n = Number(value);
    setCols(n);
    const newMatrix = Array.from({ length: rows }, () =>
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
      alert("Error: Matrix cannot be all zeros.\n\nPlease enter valid matrix values.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/rank", {
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
      setResult(data.rank);
    } catch (err) {
      console.error(err);
      alert("Error calculating rank");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-screen grid grid-cols-[55vw_20vw] bg-[#676569]">
      <div className="mainwindow bg-[#424143] mt-[7vh] ml-2 rounded-2xl">
        <h1 className="text-3xl flex justify-center mt-7 font-bold">
          Matrix Rank Calculator
        </h1>
        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-10">
          Calculate the rank of a matrix online for free. The matrix rank is determined by finding the maximum number of linearly independent rows or columns using Gaussian elimination with row echelon form.
        </p>

        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-3">
          Have questions? Read the instructions.
        </p>

        <div className="text-[15px] text-[#B5B5B5] m-10 mt-7">
          <h2 className="text-[17px] font-semibold mt-2">About Matrix Rank</h2>

          <p className="text-[15px] text-[#B5B5B5] my-2">
            The rank of a matrix is the dimension of the vector space spanned by its rows or columns. It represents the maximum number of linearly independent rows or columns in the matrix.
          </p>

          <ol className="list-decimal list-inside mx-7 space-y-1">
            <li>The rank is determined by performing row reduction to echelon form.</li>
            <li>Count the number of non-zero rows in the row echelon form.</li>
            <li>This count is the rank of the matrix.</li>
            <li>The rank is always less than or equal to min(rows, columns).</li>
          </ol>

          <p className="text-[15px] text-[#B5B5B5] mt-3">
            Formula: rank(A) ≤ min(m, n), where m is rows and n is columns
          </p>

          <h2 className="text-[17px] font-semibold mt-5">Key Properties</h2>

          <h3 className="text-[16px] font-semibold underline mt-3">Full Rank</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">A matrix has full rank when rank(A) = min(rows, columns). This means the matrix is invertible (if square).</p>

          <h3 className="text-[16px] font-semibold underline mt-3">Rank Deficient</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">A matrix is rank deficient when rank(A) &lt; min(rows, columns). Some rows or columns are linearly dependent.</p>

          <h3 className="text-[16px] font-semibold underline mt-3">Zero Rank</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">Only the zero matrix has rank 0. All other matrices have rank ≥ 1.</p>

          <h3 className="text-[16px] font-semibold underline mt-3">Applications</h3>
          <p className="text-[15px] text-[#B5B5B5] my-2">Matrix rank is used to determine the number of solutions in systems of linear equations, image dimension in linear transformations, and more.</p>
        </div>

        <div className="bg-[#424143] flex gap-5 p-6 mt-10 rounded-md border border-gray-600 text-white max-w-xl mx-auto">
          <div>
            <div className="flex items-center gap-20 justify-between mb-6">
              <label className="font-medium">Matrix dimension:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rows}
                  onChange={(e) => handleRowsChange(Number(e.target.value))}
                  className="w-16 text-center rounded-md bg-white text-black py-1"
                />
                <span className="text-xl">×</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={cols}
                  onChange={(e) => handleColsChange(Number(e.target.value))}
                  className="w-16 text-center rounded-md bg-white text-black py-1"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(true)}
                className="bg-[#424143] ml-4 hover:bg-gray-600 px-4 py-2 rounded-md text-white font-semibold border border-gray-500"
              >
                Calculate Rank
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-60 backdrop-blur-[8px] flex flex-col items-center justify-center z-50 overflow-y-auto py-10">
            <div className="bg-[#424143] text-white p-8 rounded-2xl shadow-lg max-w-4xl">
              <h2 className="text-xl font-semibold mb-6 text-center">
                Enter Matrix Values
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center">Matrix ({rows} × {cols})</h3>
                <div className="flex justify-center mb-6">
                  <MatrixInput
                    rows={rows}
                    cols={cols}
                    values={matrix}
                    onChange={handleMatrixInput}
                    inputColor="bg-white"
                  />
                </div>
              </div>

              {result !== null && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Rank of Matrix:</h3>
                  <div className="text-4xl font-bold text-yellow-400">
                    {result}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Maximum linearly independent rows/columns: {result} out of {Math.min(rows, cols)}
                  </p>
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

export default MatrixRank;