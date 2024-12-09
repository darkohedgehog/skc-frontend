"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";
import { IoArchiveOutline } from "react-icons/io5";
import { motion } from 'framer-motion';

const ArchiveSection = () => {

    const t = useTranslations("ArchiveSection");

    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1] || 'sr-Latn';
    const localizedPathArchive = `/${currentLocale}${'/arhivska-gradja'}`;

  return (
    <div className='my-6'>
        <motion.h1 
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className='flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl'>
            {t('title')}
        </motion.h1>
        <motion.p 
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className='flex items-center justify-center my-10 text-center text-xl font-medium tracking-tight md:text-2xl text-gray'>
            {t('paragraph')}
        </motion.p>
        <motion.div 
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className='flex items-center justify-center my-20'>
            <Link 
            href={localizedPathArchive}>
                <button aria-label='Idi na stranicu' className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button')}</span>{" "}
              <IoArchiveOutline className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
            </Link>
        </motion.div>
    </div>
  )
}

export default ArchiveSection