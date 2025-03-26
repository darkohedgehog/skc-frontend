import Books from '@/components/library/Books'
import React from 'react';
import siteMetadata from '@/app/utils/siteMetaData';

export async function generateMetadata() {
  const pageTitle = "Biblioteka Zaharija Orfelin";
  const pageDescription = "Vaša riznica znanja";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/knjige`,
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
      canonical: `${siteMetadata.siteUrl}/knjige`,
      languages: {
        'sr-Latn': `${siteMetadata.siteUrl}/sr-Latn/knjige`,
        'sr-Cyrl': `${siteMetadata.siteUrl}/sr-Cyrl/knjige`,
      },
    },    
  };
}

const BookPage = () => {
  return (
    <>
      <Books />
    </>
  )
}

export default BookPage;