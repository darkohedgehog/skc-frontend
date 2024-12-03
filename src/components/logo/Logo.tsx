"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Logo = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/") || [];
  const currentLocale = pathSegments[1] || "sr-Latn";

  return (
    <Link
      href={`/${currentLocale}/`}
      className="font-normal flex space-x-2 items-center text-sm mr-4 text-black px-2 py-1"
    >
      <Image
        src="/logo1.jpg"
        alt="logo"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
        priority={false}
      />
    </Link>
  );
};

export default Logo;
