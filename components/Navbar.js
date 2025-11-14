import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className=' flex justify-between items-center max-w-[90vw] m-auto mt-7 mb-5 cursor-pointer bg-[#424143] p-6 rounded-full px-10 '>
        <h1 className='text-amber-300 font-bold text-5xl '>
            <Link href="/"><img className="w-40" src="Logo.jpeg" alt="" /></Link>
            </h1>
        <ul className='flex gap-4 font-semibold text-[16px]'>
            <Link href='/Instructions' className='cursor-pointer '>Instructions</Link>
            <Link href="https://forms.gle/jaNZ1ZhKYUd3cNsi6" target="_blank" rel="noopener noreferrer" className='cursor-pointer '>Feedback</Link>
        </ul>
    </nav>
  )
}

export default Navbar
