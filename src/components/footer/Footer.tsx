"use client"
import Link from 'next/link'
import React from 'react'
import { FiFacebook } from "react-icons/fi";
import { RiMessengerLine, RiNextjsFill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GiHedgehog } from "react-icons/gi";
import Logo from '../logo/Logo';
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";



const Footer = () => {

  const pathname = usePathname();
  const t = useTranslations("Footer");
  const pathSegments = pathname.split("/");
  const currentLocale = pathSegments[1] || "sr-Latn";

  return (
    <>
      <footer className="rounded-lg m-4 bottom-0 w-full mx-0">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link href={`/${currentLocale}/`} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <Logo />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-accentDark"></span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray sm:mb-0 dark:text-accentDark">
                <li>
                    <Link href={`/${currentLocale}/uslovi-koristenja`} className="hover:underline me-4 md:me-6">
                        {t('uslovi')}
                    </Link>
                </li>
                <li>
                    <Link href={`/${currentLocale}/pravila-privatnosti`} className="hover:underline me-4 md:me-6">
                    {t('pravila')}
                    </Link>
                </li>
                <li>
                    <Link href={`/${currentLocale}/kontakt`} className="hover:underline">
                    {t('kontakt')}
                    </Link>
                </li>
            </ul>  
        </div>
        <div className='flex items-center justify-center my-14 flex-col'>
            <h3 className='text-accent dark:text-accentDark text-lg mb-4 font-semibold'>
            {t('title1')}
                </h3>
        <span className="inline-flex mx-4 gap-4">
                  <Link 
                  className="text-blue-500" 
                  href={'https://www.facebook.com/skcvukovar'} target='blank'>
                  <FiFacebook className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="text-blue-500 mx-2" 
                  href={'https://web.facebook.com/skcvukovar?_rdc=1&_rdr'}
                  target='blank'>
                  <RiMessengerLine className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="mx-2 text-blue-500" 
                  href={'mailto:direktor@skcvukovar.hr'} target='blank'>
                  <MdOutlineAlternateEmail className='h-6 w-6' />
                  </Link>
                </span>
                <div className='flex items-center justify-center mt-6 text-accent dark:text-accentDark text-sm text-center'>
                {t('address1')} <br />{t('address2')}
                    </div>
                </div>
        <div className="flex items-center justify-center gap-2 my-3 text-sm text-accent sm:text-center dark:text-accentDark"> 
         Powered by 
         <Link href={'https://nextjs.org/'} target='blank'>
         <RiNextjsFill className='w-6 h-6' />
         </Link>
        </div>
        <div className="flex items-center justify-center gap-2 my-6 text-sm text-gray sm:text-center"> 
         Developed by Hedgehog
         <Link href={'https://www.hedgehogwebdev.com'} target='blank'>
         <GiHedgehog className='w-6 h-6' />
         </Link>
        </div>
        <hr className="my-6 border-gray sm:mx-auto lg:my-8" />
        <span className="block text-sm text-accent sm:text-center dark:text-accentDark"> 
        © {new Date().getFullYear()} {t('title2')}<br /> {t('title3')} 
        <Link href={"/"} className="hover:underline">
        </Link> 
        <div className="flex items-center justify-center gap-2 my-6 text-sm text-gray sm:text-center"> 
         <Link href={'/sitemap.xml'} target='blank'>
            sitemap.xml
         </Link>
        </div>
        </span>
    </div>
</footer>


    </>
  )
}

export default Footer