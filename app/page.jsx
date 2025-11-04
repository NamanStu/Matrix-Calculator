"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const pathname = usePathname();
  // const [num1, setNum1] = useState("");
  // const [num2, setNum2] = useState("");
  // const [result, setResult] = useState("");

  // const handleCalculate = async () => {
  //   const res = await fetch("/api/calculate", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ num1, num2 })
  //   });
  //   const data = await res.json();
  //   setResult(data.output || data.error);
  // };

  return (
    // <div style={{ padding: 20 }}>
    //   <h1>Matrix / Number Calculator</h1>
    //   <input
    //     value={num1}
    //     onChange={(e) => setNum1(e.target.value)}
    //     placeholder="Enter first number"
    //   />
    //   <input
    //     value={num2}
    //     onChange={(e) => setNum2(e.target.value)}
    //     placeholder="Enter second number"
    //   />
    //   <button onClick={handleCalculate}>Calculate</button>
    //   <p>Result: {result}</p>
    // </div>
    <main className="max-w-screen grid grid-cols-[55vw_20vw] bg-[#676569]">
      
      <div className="mainwindow bg-[#424143] mt-[7vh] ml-2 rounded-2xl">

        <h1 className="text-3xl flex justify-center mt-7 font-bold">Matrix Calculator</h1>
        <p className="text-[15px] text-[#B5B5B5] m-10 mt-10">Discover our free, advanced matrix calculator. It provides all essential matrix operations and methods for solving systems of simultaneous linear equations, making it a perfect tool for students, engineers, and mathematicians.
        From basic homework to real-world problems, Reshish matrix calculator has you covered.</p>

        <div className="text-[15px] text-[#B5B5B5] m-10 mt-10">

        <h2 className="text-[17px] font-semibold mt-3">Key Features :</h2>

        <h3 className="ext-[16px] font-semibold underline mt-3">Step-by-step solution:</h3>
        <p>Our advanced calculator provides a detailed step-by-step solution, making it invaluable for students. For methods requiring intricate calculations it offers a very detailed solution.</p>

        <h3 className="text-[16px] font-semibold underline mt-3">Complex Numbers Support:</h3>
        <p>Reshish matrix calculator stands out from other tools by supporting complex numbers seamlessly across all operations and methods, making it ideal for advanced calculations.</p>

        <h3 className="text-[16px] font-semibold underline mt-3">Continuous Calculation:</h3>
        <p>Once you complete an operation, you can immediately perform another using either your original matrix or the calculated result. This eliminates the need to re-enter data and streamlines multi-step calculations.</p>

        </div>

        <div className="text-[15px] text-[#B5B5B5] m-10 mt-10">

        <h2 className="text-[17px] font-semibold mt-3">Why to use a Calculator : </h2>

        <h3 className="ext-[16px] font-semibold underline mt-3">Error Reduction:</h3>
        <p>Human calculation errors are common in intricate mathematical operations. Our reliable calculator eliminates arithmetic mistakes and ensures consistent results.</p>

        <h3 className="text-[16px] font-semibold underline mt-3">Time Efficiency:</h3>
        <p>Manual computation can take hours, while our tool delivers results in seconds. This is particularly valuable when working with large matrices.</p>

        <h3 className="text-[16px] font-semibold underline mt-3">Enhanced Learning Experience:</h3>
        <p>Reshish matrix calculator helps students master matrix operations through detailed step-by-step solutions. This significantly accelerates the learning process.</p>

        </div>

      </div>
      <div className="ads max-w-[25vw] min-h-screen "></div>
      
    </main>
  );
}