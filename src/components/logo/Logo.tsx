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
        src="/logo-skc.svg"
        alt="logo"
        width={41}
        height={41}
        className="w-11 h-11 rounded-full object-cover"
        priority={false}
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
