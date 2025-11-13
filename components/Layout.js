"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Layout = () => {
    const pathname = usePathname();
  return (
    <div className="operations min-w-[25vw] bg-[#676569] min-h-screen  ">
        
        <div className="bg-[#424143] w-[60%] sticky top-0 ml-[40%] mt-[7vh] py-3 rounded-2xl text-[#B5B5B5] ">
          <ul className="flex flex-col items-center justify-center ">
            <Link href='/MatrixMultiplication' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/MatrixMultiplication" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Matrix Multiplication</Link>

            <Link href='/Determinant' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/Determinant" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Determinant</Link>

            {/* <Link href='/InverseMatrix' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/InverseMatrix" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Inverse Matrix</Link>

            <Link href='/CramerRule' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/CramerRule" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Cramer's Rule</Link>

            <Link href='/MatrixRank' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/MatrixRank" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Matrix Rank</Link>

            <Link href='/MatrixPower' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/MatrixPower" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Matrix Power</Link>

            <Link href='/MatrixTranspose' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/MatrixTranspose" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Matrix Transpose</Link>

            <Link href='/MatrixAddition' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/MatrixAddition" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Matrix Addition/Subtraction</Link>

            <Link href='/InverseMatrixMethod' className={`border-gray-500 border w-full flex justify-center py-3 font-semibold text-sm ${ pathname === "/InverseMatrixMethod" ? "bg-yellow-600 text-white" : "hover:bg-yellow-600 hover:text-white"}`}>Inverse Matrix Method</Link> */}

            
          </ul>
        </div>
      </div>
  )
}

export default Layout
