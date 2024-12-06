'use client';

import { useState } from 'react';
import { LuCookie } from 'react-icons/lu';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";


export default function CookiesToast() {
  const t = useTranslations("CookiesToast");  
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const currentLocale = pathSegments[1] || "sr-Latn";

  const handleAgree = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    console.log('Korisnik se slaže sa kolačićima');
    setShowModal(false);
  };
  
  const handleDisagree = () => {
    localStorage.setItem('cookieConsent', 'declined');
    console.log('Korisnik se ne slaže sa kolačićima');
    setShowModal(false);
  };
  

  return (
    <div>
      {/* Dugme za kolačiće */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 left-4 p-3 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
        aria-label="Cookie settings"
      >
        <LuCookie className="text-xl" />
      </button>

      {/* Modal za kolačiće */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 mx-4">
          <div className="bg-zinc-500 rounded-xl shadow-lg shadow-accentDark p-6 relative max-w-lg w-full">
            {/* Zatvori dugme */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-neutral-600 hover:text-neutral-300"
              aria-label="Close modal"
            >
              <AiOutlineClose className="text-xl" />
            </button>

            {/* Sadržaj */}
            <h2 className="text-xl text-neutral-100 font-semibold mb-4">
                {t('title1')}
            </h2>
            <p className="text-neutral-300 mb-4">
              {t('paragraph1')} {' '}
              <Link href={`/${currentLocale}/pravila-privatnosti`}
               className="text-blue-700 hover:underline">
                {t('privacy')}
              </Link>{' '}
              {t('and')} {' '}
              <Link href={`/${currentLocale}/uslovi-koristenja`} 
                className="text-blue-700 hover:underline">
                {t('terms')}
              </Link>{' '}
              {t('paragraph2')}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDisagree}
                className="px-4 py-2 bg-red-600 text-neutral-200 rounded-2xl hover:bg-neutral-400"
              >
                {t('button1')}
              </button>
              <button
                onClick={handleAgree}
                className="px-4 py-2 bg-blue-700 text-white rounded-2xl hover:bg-blue-600"
              >
                {t('button2')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
