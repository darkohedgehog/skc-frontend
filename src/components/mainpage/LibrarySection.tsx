"use client"
import React from 'react'
import { IoLibraryOutline } from "react-icons/io5";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function LibrarySection  ()  {

    const t = useTranslations("LibrarySection");
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1] || 'sr-Latn';
    const localizedPathLibrary = `/${currentLocale}${'/biblioteka'}`;

  return (
    <div className='mt-14'>
    <motion.h1 
    initial={{ opacity: 0.5, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.3,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className='flex items-center justify-center mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl'>
    {t('title1')} <br /> {t('title2')}
    </motion.h1>
  <div className="container px-5 py-24 mx-auto">
    <motion.div 
    initial={{ opacity: 0.5, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.5,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray sm:flex-row flex-col">
      <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
      <IoLibraryOutline className="sm:w-16 sm:h-16 w-10 h-10" />
      </div>
      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 className="text-accent dark:text-accentDark text-lg title-font font-medium mb-2">
        {t('title3')}
        </h2>
        <p className="leading-relaxed text-gray">
        {t('paragraph1')}
        </p>
      </div>
    </motion.div>
    <motion.div 
    initial={{ opacity: 0.5, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.6,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray sm:flex-row flex-col">
      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 className="text-accent dark:text-accentDark text-lg title-font font-medium mb-2">
        {t('title4')}
        </h2>
        <p className="leading-relaxed text-gray">
        {t('paragraph2')}
        </p>
      </div>
      <div className="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
        <MdOutlineLocalLibrary className="sm:w-16 sm:h-16 w-10 h-10" />
      </div>
    </motion.div>
    <motion.div 
    initial={{ opacity: 0.5, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.7,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
      <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-indigo-400 bg-gray-800 flex-shrink-0">
        <LuUser className="sm:w-16 sm:h-16 w-10 h-10" />
      </div>
      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 className="text-accent dark:text-accentDark text-lg title-font font-medium mb-2">
        {t('title5')}
        </h2>
        <p className="leading-relaxed text-gray">
        {t('paragraph3')}
        </p>

      </div>
    </motion.div>
    <motion.div 
    initial={{ opacity: 0.5, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.8,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="flex items-center justify-center my-16">
      <Link 
            href={localizedPathLibrary}>
            <button aria-label='Idi na stranicu' className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button')}</span>{" "}
              <IoLibraryOutline className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
     </Link>
    </motion.div>
  </div>
</div>
  )
}

