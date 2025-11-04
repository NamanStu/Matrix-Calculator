"use client"
import React from 'react'
import { useState } from 'react';

const MatrixMultiplication = () => {

    const [matrixA, setMatrixA] = useState({ rows: 1, cols: 1 });
    const [matrixB, setMatrixB] = useState({ rows: 1, cols: 1 });

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
            defaultValue="1"
            value={matrixA.rows}
            onChange={(e) => handleMatrixARowsChange(Number(e.target.value))}
            className="w-16 text-center rounded-md bg-white text-black py-1"
          />
          <span className="text-xl">×</span>
          <input
            type="number"
            min="1"
            defaultValue="1"
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
            defaultValue="1"
            value={matrixB.rows}
            readOnly
            title="This value is automatically set to match Matrix A columns"
            className="w-16 text-center rounded-md bg-white text-black py-1"
          />
          <span className="text-xl">×</span>
          <input
            type="number"
            min="1"
            defaultValue="1"
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
        <button className="bg-[#424143] hover:bg-gray-600 px-4 py-2 rounded-md text-white font-semibold border border-gray-500">
          Set matrices
        </button>
      </div>
      </div>
    </div>

        </div>
        </div>
      <div className="ads max-w-[25vw] min-h-screen "></div>
      
    </main>
  )
}

export default MatrixMultiplication
