import React from 'react';
import siteMetadata from '@/app/utils/siteMetaData';
import LibraryIntro from '@/components/books/LibraryIntro';

export async function generateMetadata() {
  const pageTitle = "Biblioteka Zaharije Orfelin";
  const pageDescription = "Više od 20.000 naslova koje čuvamo za vas...";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/biblioteka`,
      siteName: siteMetadata.title,
      images: [`${siteMetadata.siteUrl}/social-media.png`],
      locale: "sr-Latn",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`${siteMetadata.siteUrl}/social-media.png`], 
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog`,
      languages: {
        'sr-Latn': `${siteMetadata.siteUrl}/sr-Latn/biblioteka`,
        'sr-Cyrl': `${siteMetadata.siteUrl}/sr-Cyrl/biblioteka`,
      },
    },    
  };
}

const BibliotekaPage = () => {
  return (
    <>
      <LibraryIntro />
    </>
  )
}

export default BibliotekaPage;