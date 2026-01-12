'use client';

import { useEffect, useMemo, useState } from 'react';
import { LuCookie } from 'react-icons/lu';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

type Consent = 'accepted' | 'declined' | null;

export default function CookiesToast() {
  const t = useTranslations('CookiesToast');
  const pathname = usePathname();

  const currentLocale = useMemo(() => {
    const seg = pathname.split('/')[1];
    return seg || 'sr-Latn';
  }, [pathname]);

  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<Consent>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('cookieConsent') as Consent;
      setConsent(saved === 'accepted' || saved === 'declined' ? saved : null);
    } catch {
      setConsent(null);
    }
  }, []);

  const handleAgree = () => {
    try {
      localStorage.setItem('cookieConsent', 'accepted');
    } catch {}
    setConsent('accepted');
    setShowModal(false);
  };

  const handleDisagree = () => {
    try {
      localStorage.setItem('cookieConsent', 'declined');
    } catch {}
    setConsent('declined');
    setShowModal(false);
  };

  if (!mounted) return null;

  return (
    <div>
      {/* Dugme za kolačiće — UVEK vidljivo */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 left-4 p-3 bg-blue-700 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors z-50"
        aria-label="Cookie settings"
        type="button"
        title={
          consent === 'accepted'
            ? 'Cookies: accepted'
            : consent === 'declined'
            ? 'Cookies: declined'
            : 'Cookie preferences'
        }
      >
        <LuCookie className="text-xl" />
      </button>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 mx-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          onClick={() => setShowModal(false)} // klik na backdrop zatvara
        >
          <div
            className="bg-zinc-500 rounded-xl shadow-lg shadow-accentDark p-6 relative max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} // spreči zatvaranje kad klikneš unutar modala
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-neutral-600 hover:text-neutral-300"
              aria-label="Close modal"
              type="button"
            >
              <AiOutlineClose className="text-xl" />
            </button>

            <h2 className="text-xl text-neutral-100 font-semibold mb-4">
              {t('title1')}
            </h2>

            <p className="text-neutral-300 mb-4">
              {t('paragraph1')}{' '}
              <Link
                href={`/${currentLocale}/pravila-privatnosti`}
                className="text-blue-700 hover:underline"
                onClick={() => setShowModal(false)}
              >
                {t('privacy')}
              </Link>{' '}
              {t('and')}{' '}
              <Link
                href={`/${currentLocale}/uslovi-koristenja`}
                className="text-blue-700 hover:underline"
                onClick={() => setShowModal(false)}
              >
                {t('terms')}
              </Link>{' '}
              {t('paragraph2')}
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDisagree}
                className="px-4 py-2 bg-red-600 text-neutral-200 rounded-2xl hover:bg-neutral-400"
                type="button"
              >
                {t('button1')}
              </button>

              <button
                onClick={handleAgree}
                className="px-4 py-2 bg-blue-700 text-white rounded-2xl hover:bg-blue-600"
                type="button"
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