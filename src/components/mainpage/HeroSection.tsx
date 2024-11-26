"use client"
import React from "react";
import { HiArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { FeaturedImages } from "./FeaturedImages";
import Link from "next/link";

export default function HeroSection() {
  const t = useTranslations('HeroSection')
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] || 'sr-Latn';
  const localizedPathContact = `/${currentLocale}${'/kontakt'}`;
  const localizedPathAbout = `/${currentLocale}${'/o-nama'}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 max-w-7xl mx-auto pt-20 md:pt-40 relative overflow-hidden px-4 md:px-8">
      <div className="flex flex-col items-start">
        <h1 className="text-3xl md:text-5xl md:leading-tight max-w-5xl text-left tracking-tight font-bold bg-clip-text text-transparent bg-gradient-to-b dark:from-neutral-800 dark:via-white dark:to-white from-neutral-800 via-neutral-600 to-neutral-600">
       {t('title1')}
       <span className="uppercase text-4xl gap-1 flex items-center justify-start text-accent dark:text-accentDark">
        {t('span')}
        </span>
        </h1>
        <p className=" mt-2 md:mt-6 text-left md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl  relative z-10">
        {t('paragraph')}
        </p>
        <FeaturedImages
          textClassName="lg:text-left text-left"
          className="lg:justify-start justify-start items-center"
          showStars
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start w-full items-center">
          <div className="flex items-center gap-4 justify-start my-4 relative z-10">
            <Link 
                href={localizedPathContact}>
            <button className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button1')}</span>{" "}
              <HiArrowRight className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
            </Link>
          </div>
          <Link
            href={localizedPathAbout}>
          <button className="text-gray dark:text-300 text-base font-medium">
          {t('button2')}
          </button>
          </Link>
        </div>
      </div>
      <div>
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 bg-neutral-100 dark:bg-neutral-900 shadow-[0px_0px_5px_1px_rgba(0,0,0,0.05)_inset] dark:shadow-[0px_0px_5px_1px_rgba(255,255,255,0.05)_inset]">
          <Image
            src="/herobanner.png"
            alt="Dashboard Image"
            width={1000}
            height={1000}
            className="rounded-2xl h-72 w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}



