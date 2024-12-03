"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import { useTranslations } from 'next-intl';
import { MdOutlineAssuredWorkload } from "react-icons/md";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function AboutSection() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1] || 'sr-Latn';
    const localizedPathAbout = `/${currentLocale}${'/o-nama'}`;
    const t = useTranslations('AboutSection');

  return (
    <>
    <h1 className="flex items-center justify-center pt-10 mt-20 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-6xl">
        {t('title1')}
    </h1>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full pt-10 mt-20 px-2">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          {t('title2')}
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          {t('paragraph1')}
          </p>
        </div>
        <Image
          src="/traditional.jpg"
          width={500}
          height={500}
          alt="Uskrs"
          priority
          className="absolute -right-4 lg:-right-[5%] -bottom-10 object-contain rounded-2xl h-80 w-auto lg:h-auto"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        {t('title3')}
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        {t('paragraph2')}
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          {t('title4')}
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          {t('paragraph3')}
          </p>
        </div>
        <Image
          src="/vuk-karadzic.jpg"
          width={500}
          height={500}
          alt="Vuk Karadzic"
          priority
          className="absolute -right-10 md:-right-[40%] lg:-right-[3%] -bottom-1 object-contain rounded-2xl h-80 lg:h-auto w-auto"
        />
      </WobbleCard>
    </div>
    <div className="flex items-center justify-center my-16">
      <Link 
            href={localizedPathAbout}>
            <button className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button')}</span>{" "}
              <MdOutlineAssuredWorkload className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
     </Link>
    </div>
    </>
  );
}
