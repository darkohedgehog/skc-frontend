"use client"
import Image from 'next/image';
import React from 'react';
import Link from 'next/link'
import { TiPhoneOutline } from "react-icons/ti";
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";

const Portfolio = () => {
    const t = useTranslations("Portfolio");
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1] || 'sr-Latn';
    const localizedPathContact = `/${currentLocale}${'/kontakt'}`;

  return (
  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
  <h1 className="bg-gradient-to-br from-slate-400 to-slate-700 dark:from-slate-300 dark:to-slate-500 py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-4xl">
        {t('title1')}<br /> {t('title2')} <br />
        {t('title3')}
    </h1>
    <Image
     alt="Jelica Lipovac Dudaš" 
     src="/jelica_lipovac_dudas.jpg"
     width={700}
     height={600}
     priority={false}
     className="w-80 h-96 my-10 object-cover object-center rounded-xl shadow-lg shadow-gray dark:shadow-accentDark"/>
    <div className="text-center lg:w-2/3 w-full mt-10 text-neutral-600 dark:text-gray text-2xl">
      <p className="mb-8 leading-relaxed">
      {t('paragraph1')}<br /> {t('paragraph2')}
      </p>
      <p className="mb-8 leading-relaxed">
      {t('paragraph3')}
      </p>
      <p className="mb-8 leading-relaxed">{
      t('paragraph4')}
      </p>
      <div className="flex items-center justify-center my-10">
      <Link 
            href={localizedPathContact}>
                <button className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button')}</span>{" "}
              <TiPhoneOutline className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default Portfolio;