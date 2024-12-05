"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { StatutType } from "../../../types";
import Link from "next/link";

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
      <div className="flex items-center justify-center text-accent dark:text-accentDark h-screen">
        Učitavanje...
      </div>
    );
  }

  if (!statut) {
    return (
      <div className="flex items-center justify-center text-red-500 h-screen">
        Statut nije pronađen.
      </div>
    );
  }

  return (
    <div className="px-10 md:px-20 py-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl lg:text-4xl font-bold text-center text-accent dark:text-accentDark mb-10">
        {statut.title}
      </h1>

      {statut.image?.url.endsWith(".pdf") ? (
        <div className="flex justify-center my-10">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}${statut.image.url}`}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white px-6 py-3 rounded-lg shadow-lg hover:bg-accentDark w-auto h-auto"
          >
            Preuzmi dokument
          </Link>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          Dokument nije dostupan u PDF formatu.
        </div>
      )}
    </div>
  );
};

export default StatutDocument;
