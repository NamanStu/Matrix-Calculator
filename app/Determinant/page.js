"use client"
import { useState } from 'react'
import React from 'react'

const Determinant = () => {
    const [matrixdim, setmatrixdim] = useState({ dim: 1})
    const handleMatrixARowsChange = (value) => {
    setmatrixdim((prev) => ({ ...prev, dim: value }));
  };
  return (
    <main className="max-w-screen grid grid-cols-[55vw_20vw] bg-[#676569]">
      
      <div className="mainwindow bg-[#424143] mt-[7vh] ml-2 rounded-2xl">

        <h1 className="text-3xl flex justify-center mt-7 font-bold">Matrix Multiplication Calculator</h1>
        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-10">Here you can calculate a determinant of a matrix with complex numbers online for free with a very detailed solution. Determinant is calculated by reducing a matrix to row echelon form and multiplying its main diagonal elements.</p>

        <p className="text-[15px] text-[#B5B5B5] mx-10 mt-3">Have questions? Read the instructions.</p>

        <div className="text-[15px] text-[#B5B5B5] m-10 mt-7">

        <h2 className="text-[17px] font-semibold mt-2">About the method</h2>

        <p className="text-[15px] text-[#B5B5B5] my-2 ">To calculate a determinant you need to do the following steps.</p>  

        <ol className='list-decimal list-inside mx-7 space-y-1'>
            <li>Set the matrix (must be square).</li>
            <li>Reduce this matrix to row echelon form using elementary row operations so that all the elements below diagonal are zero.</li>
            <li>Multiply the main diagonal elements of the matrix - determinant is calculated.</li>
        </ol>

        <p className="text-[15px] text-[#B5B5B5] mt-3 ">To understand determinant calculation better input any example, choose "very detailed solution" option and examine the solution.</p>
        </div>
        <div className="flex items-center gap-10 justify-center mb-6 mt-20 ">
        <label className=" font-medium ">Matrix A dimension:</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            defaultValue="1"
            value={matrixdim.dim}
            onChange={(e) => handleMatrixARowsChange(Number(e.target.value))}
            className="w-16 text-center rounded-md bg-white text-black py-1"
          />
          </div>
          <div className=" ml-5">
        <button className="bg-[#424143] hover:bg-gray-600 px-3 py-1 rounded-md text-white font-semibold border border-gray-500">
          Set matrices
        </button>
      </div>
          </div>
        </div>
          <div className="ads max-w-[25vw] min-h-screen "></div>
        </main>
  )
}

export default Determinant
