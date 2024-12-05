"use client"
import Image from 'next/image';
import React from 'react';
import Link from 'next/link'
import { TiPhoneOutline } from "react-icons/ti";
import { usePathname } from 'next/navigation';
import { useTranslations } from "next-intl";

const Portfolio = () => {
    const t = useTranslations("LibraryIntro");
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1] || 'sr-Latn';
    const localizedPathContact = `/${currentLocale}${'/kontakt'}`;
  return (
    <section>
  <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
    <Image
     alt="Jelica Lipovac Dudaš" 
     src="/vuk-karadzic.jpg"
     width={700}
     height={600}
     priority={false}
     className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded-xl shadow-lg shadow-gray dark:shadow-accentDark"/>
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-4xl">
        Direktor Srpskog kulturnog centra Vukovar <br />
        Jelica Lipovac Dudaš
        </h1>
      <p className="mb-8 leading-relaxed">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
      <p className="mb-8 leading-relaxed">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
      <p className="mb-8 leading-relaxed">Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over meditation PBR&B pickled ennui celiac mlkshk freegan photo booth af fingerstache pitchfork.</p>
      <div className="flex items-center justify-center">
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
</section>
  )
}

export default Portfolio;