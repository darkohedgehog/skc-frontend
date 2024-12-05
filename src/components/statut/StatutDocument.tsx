"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StatutType } from "../../../types";
import Link from "next/link";
import { FaDownload } from "react-icons/fa";

async function fetchStatut(locale: string): Promise<StatutType | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/statuts?locale=${locale}&populate=image`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data?.[0] || null; // Pretpostavka da postoji samo jedan statut
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

const StatutDocument = () => {
  const t = useTranslations("Statut");
  const locale = useLocale(); // Dinamički dohvat jezika
  const [statut, setStatut] = useState<StatutType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStatut = async () => {
      setLoading(true);
      const fetchedStatut = await fetchStatut(locale);
      setStatut(fetchedStatut);
      setLoading(false);
    };

    getStatut();
  }, [locale]);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-accent dark:text-accentDark h-screen mt-40">
        {t('loading')}
      </div>
    );
  }

  if (!statut) {
    return (
      <div className="flex items-center justify-center text-red-500 h-screen mt-40">
        {t('available')}
      </div>
    );
  }

  return (
    <div className="px-10 md:px-20 py-10 flex flex-col items-center justify-center mt-28">
      <h1 className="text-2xl lg:text-3xl font-bold text-center text-accent dark:text-accentDark mb-10">
        {statut.title}
      </h1>

      {statut.image?.url.endsWith(".pdf") ? (
        <div className="flex justify-center my-10">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}${statut.image.url}`}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('download')}</span>{" "}
              <FaDownload className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          {t('content')}
        </div>
      )}
    </div>
  );
};

export default StatutDocument;
