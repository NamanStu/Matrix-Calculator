"use client";

export default function Home() {

  return (
    
    <main className="max-w-screen grid grid-cols-[55vw_20vw] bg-[#676569]">
      
      <div className="mainwindow bg-[#424143] mt-[7vh] ml-2 rounded-2xl">

      <h1 className="text-3xl flex justify-center mt-7 font-bold">Instructions — How to use the Matrix Calculator</h1>

      <p className="text-[15px] text-[#B5B5B5] m-10 mt-10">Welcome! This matrix calculator is built to help you perform matrix operations quickly and learn step‑by‑step. Below are clear, actionable instructions and practical tips so you can get accurate results and understand every step.</p>

      <div className="text-[15px] text-[#B5B5B5] m-10 mt-10">

        <h2 className="text-[17px] font-semibold mt-3">Quick Start — Basic Workflow :</h2>
        <ol className="list-decimal ml-6 mt-2 space-y-2">
          <li><strong>Choose operation:</strong> Select the operation you want (addition, subtraction, multiplication, inverse, determinant, rank, row reduction, eigenvalues, etc.).</li>
          <li><strong>Set matrix size:</strong> Pick the number of rows and columns for each matrix. For multiplication, ensure the number of columns in A equals the number of rows in B.</li>
          <li><strong>Enter values:</strong> Type numbers directly into the grid. Use "+" or "-" for signs and "i" for imaginary unit (e.g., <code>3+2i</code>).</li>
          <li><strong>Choose precision:</strong> Pick the number of decimal places for the result if the app supports rounding.</li>
          <li><strong>Compute:</strong> Click the compute/solve button. The result will appear along with a step-by-step explanation (when available).</li>
          <li><strong>Iterate:</strong> Use the result as a new input for further operations without retyping — perfect for multi-step problems.</li>
        </ol>

        <h2 className="text-[17px] font-semibold mt-6">Input Guidelines & Supported Formats:</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li><strong>Numbers:</strong> Enter integers or decimals (e.g., <code>5</code>, <code>3.14</code>).</li>
          <li><strong>Complex numbers:</strong> Use <code>a+bi</code> or <code>a-bi</code> (e.g., <code>2-4i</code>).</li>
          <li><strong>Empty cells:</strong> Treated as <code>0</code>. Fill only the cells you need.</li>
          <li><strong>Matrix sizes:</strong> Non-square matrices are allowed for many operations; some operations (inverse, determinant, eigenvalues) require square matrices.</li>
        </ul>

      </div>

      <div className="text-[15px] text-[#B5B5B5] m-10 mt-10">

        <h2 className="text-[17px] font-semibold mt-3">Detailed Steps for Common Operations :</h2>

        <h3 className="text-[16px] font-semibold underline mt-3">Multiplication</h3>
        <ol className="list-decimal ml-6 mt-2 space-y-2">
          <li>Ensure <em>cols(A) = rows(B)</em>. The app will warn if sizes mismatch.</li>
          <li>Click <strong>Compute</strong> — each element of the product matrix is computed as the dot product of the corresponding row and column.</li>
          <li>View step-by-step intermediate dot-products if you need to learn the mechanics.</li>
        </ol>

        <h3 className="text-[16px] font-semibold underline mt-3">Inverse (for square matrices)</h3>
        <ol className="list-decimal ml-6 mt-2 space-y-2">
          <li>Only available for square matrices. The app checks determinant first.</li>
          <li>If determinant ≠ 0, the app uses row operations (or Gaussian elimination) to compute the inverse and shows each row operation.</li>
        </ol>

        <h3 className="text-[16px] font-semibold underline mt-3">Determinant & Rank</h3>
        <ol className="list-decimal ml-6 mt-2 space-y-2">
          <li>Determinant is calculated for square matrices — the computation method (expansion, row reduction) is shown.</li>
          <li>Rank is determined via row-reduction to row‑echelon form; pivot count = rank.</li>
        </ol>

      </div>

      <div className="text-[15px] text-[#B5B5B5] m-10 mt-10">

        <h2 className="text-[17px] font-semibold mt-3">Tips, Best Practices & Troubleshooting :</h2>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li><strong>Check sizes:</strong> Always verify matrix dimensions before computing (common source of errors).</li>
          <li><strong>Precision issues:</strong> For very small determinants or near-singular matrices, increase displayed precision to inspect results.</li>
          <li><strong>Complex arithmetic:</strong> Ensure you use <code>i</code> for imaginary unit; operations will follow complex arithmetic rules.</li>
          <li><strong>Performance:</strong> Large matrices (e.g., 100×100) may be slow or resource-heavy — use smaller sizes for interactive exploration.</li>
          <li><strong>Saving & exporting:</strong> Export results or copy them to clipboard if the app provides those options for later use.</li>
          <li><strong>Learning:</strong> Use the step-by-step output to study methods — try manually replicating steps to reinforce concepts.</li>
        </ul>

      </div>

    </div>
      <div className="ads max-w-[25vw] min-h-screen "></div>
      
    </main>
  );
}