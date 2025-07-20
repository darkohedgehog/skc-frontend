"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { TiPhoneOutline } from "react-icons/ti";
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";

const ArchiveComponent = () => {
    const t = useTranslations("ArchiveComponent");
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1] || 'sr-Latn';
    const localizedPathContact = `/${currentLocale}${'/kontakt'}`;

  return (
<section className="">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <Image 
      width={700}
      height={600}
      alt="arhivska gradja" 
      src="/assets/arhivska-gradja.webp"
      priority={false}
      className="object-cover object-center rounded-xl shadow-lg shadow-gray dark:shadow-accentDark w-auto h-auto" />
    </div>
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="sm:text-4xl text-3xl mb-4 font-medium text-accent dark:text-accentDark">
        {t('title1')} -
        <br className="hidden lg:inline-block"/>{t('title2')}
      </h1>
      <p className="mb-8 leading-relaxed text-neutral-800 dark:text-gray">
      {t('paragraph1')} <br />
      {t('paragraph2')}
      </p>
      <div className="flex justify-center items-center gap-6">
      <a
            href="https://arhiva.skcvukovar.hr/" target='_blank'>
                <button className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button1')}</span>{" "}
              <FaSearch className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
        </a>
        <Link 
            href={localizedPathContact}>
                <button className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button2')}</span>{" "}
              <TiPhoneOutline className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
        </Link>
      </div>
    </div>
  </div>
</section>
  )
}

export default ArchiveComponent;