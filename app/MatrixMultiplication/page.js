"use client"
import React from 'react'
import { useState } from 'react';

const MatrixMultiplication = () => {

    const [matrixAValues, setMatrixAValues] = useState([]);
    const [matrixBValues, setMatrixBValues] = useState([]);
    const [result, setResult] = useState(null);


    const [matrixA, setMatrixA] = useState({ rows: 1, cols: 1 });
    const [matrixB, setMatrixB] = useState({ rows: 1, cols: 1 });
    const [showModal, setShowModal] = useState(false);

    const initializeMatrix = (rows, cols) => {
        return Array(rows).fill().map(() => Array(cols).fill(0));
    };
    // This is Making an array with no. of rows = rows input and Columns also with the values inside = 0;
    

    // Handle input change for matrix cells
    const handleMatrixInputChange = (matrixType, row, col, value) => {
        const numValue = value === '' ? 0 : Number(value);
        if (matrixType === 'A') {
            const newMatrix = [...matrixAValues];
            newMatrix[row][col] = numValue;
            setMatrixAValues(newMatrix);
        } else {
            const newMatrix = [...matrixBValues];
            newMatrix[row][col] = numValue;
            setMatrixBValues(newMatrix);
        }
    };

    // Initialize matrices when dimensions change
    React.useEffect(() => {
        setMatrixAValues(initializeMatrix(matrixA.rows, matrixA.cols));
        setMatrixBValues(initializeMatrix(matrixB.rows, matrixB.cols));
    }, [matrixA.rows, matrixA.cols, matrixB.rows, matrixB.cols]);

    // Handle matrix multiplication
    const handleMultiply = async () => {
        try {
            const response = await fetch("/api/compute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    matrixA: matrixAValues,
                    matrixB: matrixBValues,
                }),
            });
            const data = await response.json();
            setResult(data.result);
            setShowModal(false);
        } catch (error) {
            console.error("Error multiplying matrices:", error);
        }
    };

    // Matrix Input Component
    const MatrixInput = ({ matrix, values, onChange, label }) => (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            <div className="grid gap-2">
                {Array(matrix.rows).fill().map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-2">
                        {Array(matrix.cols).fill().map((_, colIndex) => (
                            <input
                                key={colIndex}
                                type="number"
                                value={values[rowIndex]?.[colIndex] || 0}
                                onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                                className="w-12 h-12 text-center rounded-md bg-white text-black"
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );


//     const handleSubmit = async () => {
//     const response = await fetch("/api/compute", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ matrixA, matrixB }),
//     });

//     const result = await response.json();
//     alert("Result matrix: " + JSON.stringify(result));
//   };
    // Update Matrix A's rows
    const handleMatrixARowsChange = (value) => {
    setMatrixA((prev) => ({ ...prev, rows: value }));
  };

  // Update Matrix A's cols AND Matrix B's rows (sync for multiplication)
    const handleMatrixAColsChange = (value) => {
    setMatrixA((prev) => ({ ...prev, cols: value }));
    setMatrixB((prev) => ({ ...prev, rows: value }));
  };

  // Update Matrix B's cols independently
    const handleMatrixBColsChange = (value) => {
    setMatrixB((prev) => ({ ...prev, cols: value }));
  };

//     const HandleMatrix = () => {
//     ;
//   };

  return (
    <main className="max-w-screen grid grid-cols-[55vw_20vw] bg-[#676569]">
      
      <div className="mainwindow bg-[#424143] mt-[7vh] ml-2 rounded-2xl">

        <h1 className="text-3xl flex justify-center mt-7 font-bold">Matrix Multiplication Calculator</h1>
        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-10">Here you can perform matrix multiplication with complex numbers online for free. However matrices can be not only two-dimensional, but also one-dimensional (vectors), so that you can multiply vectors, vector by matrix and vice versa.</p>

        <p className="text-[15px] text-[#B5B5B5] mx-10 ">After calculation you can multiply the result by another matrix right there!</p>

        <p className="text-[15px] text-[#B5B5B5] mx-10 ">Have questions? Read the instructions.</p>

        <div className="text-[15px] text-[#B5B5B5] m-10 mt-10">

        <h2 className="text-[17px] font-semibold mt-3">About the method</h2>

        <ol className='list-decimal list-inside mx-7 space-y-1'>
            <li>The main condition of matrix multiplication is that the number of columns of the 1st matrix must equal to the number of rows of the 2nd one.</li>
            <li>As a result of multiplication you will get a new matrix that has the same quantity of rows as the 1st one has and the same quantity of columns as the 2nd one.</li>
            <li>For example if you multiply a matrix of 'n' x 'k' by 'k' x 'm' size you'll get a new one of 'n' x 'm' dimension.</li>
        </ol>

        <p className="text-[15px] text-[#B5B5B5] mt-3 ">To understand matrix multiplication better input any example and examine the solution.</p>
        <div className="bg-[#424143] flex gap-5 p-6 mt-10 rounded-md border border-gray-600 text-white max-w-xl mx-auto">
            <div>
            
      {/* Matrix A */}
      <div className="flex items-center gap-20 justify-between mb-6 ">
        <label className=" font-medium ">Matrix A dimension:</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            // defaultValue="1"
            value={matrixA.rows}
            onChange={(e) => handleMatrixARowsChange(Number(e.target.value))}
            className="w-16 text-center rounded-md bg-white text-black py-1"
          />
          <span className="text-xl">×</span>
          <input
            type="number"
            min="1"
            // defaultValue="1"
            value={matrixA.cols}
            onChange={(e) => handleMatrixAColsChange(Number(e.target.value))}
            className="w-16 text-center rounded-md bg-white text-black py-1"
          />
        </div>
      </div>

      {/* Matrix B */}
      <div className="flex items-center justify-between mb-6">
        <label className=" font-medium ">Matrix B dimension:</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            // defaultValue="1"
            value={matrixB.rows}
            readOnly
            title="This value is automatically set to match Matrix A columns"
            className="w-16 text-center rounded-md bg-white text-black py-1"
          />
          <span className="text-xl">×</span>
          <input
            type="number"
            min="1"
            // defaultValue="1"
            value={matrixB.cols}
            onChange={(e) => handleMatrixBColsChange(Number(e.target.value))}
            className="w-16 text-center rounded-md bg-white text-black py-1"
          />
        </div>
      </div>
      </div>
      <div>

      {/* Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#424143] mt-5 ml-4 hover:bg-gray-600 px-4 py-2 rounded-md text-white font-semibold border border-gray-500"
        >
          Set matrices
        </button>
      </div>

      {/* Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-opacity-60 backdrop-blur-[6px] flex items-center justify-center z-50">
          <div className="bg-[#424143] text-white p-6 rounded-2xl shadow-lg w-96 relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Matrix Setup Complete
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Matrix A: {matrixA.rows} × {matrixA.cols} <br />
              Matrix B: {matrixB.rows} × {matrixB.cols}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
    
      )} */}
{/* Updated Modal */}

            {showModal && (
                <div className="fixed inset-0 bg-opacity-60 backdrop-blur-[8px] gap-10 flex flex-col items-center justify-center z-50"> 
                    {/* Matrix A Input div */}
                    <div className="bg-[#424143] text-white p-8 rounded-2xl shadow-lg max-w-4xl relative">
                        <h2 className="text-xl font-semibold mb-6 text-center">Enter Matrix A Values</h2>
                        
                        <div className="flex gap-8 justify-center">
                            <MatrixInput
                                matrix={matrixA}
                                values={matrixAValues}
                                onChange={(row, col, value) => handleMatrixInputChange('A', row, col, value)}
                                label="Matrix A"
                            />
                            
                        </div>

                        {result && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Result Matrix:</h3>
                                <div className="grid gap-2">
                                    {result.map((row, rowIndex) => (
                                        <div key={rowIndex} className="flex gap-2">
                                            {row.map((value, colIndex) => (
                                                <div
                                                    key={colIndex}
                                                    className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-md"
                                                >
                                                    {value}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                    {/* Matrix B Input div */}
                    <div className="bg-[#424143] text-white p-8 rounded-2xl shadow-lg max-w-4xl relative">
                        <h2 className="text-xl font-semibold mb-6 text-center">Enter Matrix B Values</h2>
                        
                        <div className="flex gap-8 justify-center">
                            
                            <MatrixInput
                                matrix={matrixB}
                                values={matrixBValues}
                                onChange={(row, col, value) => handleMatrixInputChange('B', row, col, value)}
                                label="Matrix B"
                            />
                        </div>

                        {result && (
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Result Matrix:</h3>
                                <div className="grid gap-2">
                                    {result.map((row, rowIndex) => (
                                        <div key={rowIndex} className="flex gap-2">
                                            {row.map((value, colIndex) => (
                                                <div
                                                    key={colIndex}
                                                    className="w-12 h-12 flex items-center justify-center bg-gray-800 rounded-md"
                                                >
                                                    {value}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={handleMultiply}
                                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md"
                            >
                                Multiply
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

      </div>
    </div>

        </div>
        </div>
      <div className="ads max-w-[25vw] min-h-screen "></div>
      
    </main>
  )
}

export default MatrixMultiplication
