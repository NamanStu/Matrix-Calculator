"use client";
import Link from "next/link";
import { useState } from "react";

export default function InlinePdfPreview({ link, label }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      
      <Link
        href={"/docs/matrix_multiplication_complete.pdf"}
        target="_blank"
        className=" underline "
      > 
        Futher Documentation with Examples.
      </Link>

      {show && (
        <div className="absolute top-5 left-65 w-72 h-96 bg-[#676569] border shadow-2xl rounded-xl p-2 z-50">
          <iframe
            src={"/docs/matrix_multiplication_complete.pdf"}
            className="w-full h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}