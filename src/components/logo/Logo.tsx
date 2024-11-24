import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <Image
        src="/logo.jpg"
        alt="logo"
        width={30}
        height={30}
        priority
        className='w-10 h-10 rounded-full'
      />
    </Link>
  )
}

export default Logo;