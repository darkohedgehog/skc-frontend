"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TiPhoneOutline } from "react-icons/ti";
import { GiBookmark } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";

const LibraryIntro = () => {
    const t = useTranslations("LibraryIntro");
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1] || 'sr-Latn';
    const localizedPathContact = `/${currentLocale}${'/kontakt'}`;
    const localizedPathKnjige = `/${currentLocale}${'/knjige'}`;

  return (
<section>
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
      <Image 
      width={700}
      height={600}
      alt="biblioteka Zaharija Orfelin" 
      src="/assets/library-banner.jpg"
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
      {t('paragraph2')} <br />
      </p>
      <p className="mb-8 leading-relaxed text-neutral-800 dark:text-gray">
      {t('paragraph3')} <br />
      {t('paragraph4')} <br />
      </p>
      <p className="mb-8 leading-relaxed text-neutral-800 dark:text-gray uppercase">
      {t('paragraph5')} <br />
      {t('paragraph6')} <br />
      </p>
      <div className="flex justify-center items-center gap-6">
        <Link 
            href={localizedPathContact}>
                <button className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button1')}</span>{" "}
              <TiPhoneOutline className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
        </Link>
      </div>
    </div>
  </div>
  <div className='flex items-center justify-center flex-col'>
      <h1 className="sm:text-3xl text-2xl mb-4 font-medium text-accent dark:text-accentDark my-6 lg:mx-4 md:mx-4 sm:mx-4 text-center">
      {t('title3')}
      </h1>
      <h2 className="sm:text-2xl text-xl mb-4 font-medium text-accent dark:text-accentDark my-6">
      {t('title4')}
        </h2>
      <div className="flex justify-center items-center gap-6">
        <Link 
            href={localizedPathKnjige}>
                <button className="flex mt-4 space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button2')}</span>{" "}
              <GiBookmark className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
        </Link>
      </div>
    </div>
</section>
  )
}

export default LibraryIntro;