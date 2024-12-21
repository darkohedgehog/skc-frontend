import React from 'react';
import siteMetadata from '@/app/utils/siteMetaData';
import AboutUsComponent from '@/components/about/AboutUsComponent';

export async function generateMetadata() {
  const pageTitle = "O nama";
  const pageDescription = "Ustanova u oblasti kulture Srpski kulturni centar Vukovar";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/o-nama`,
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
      canonical: `${siteMetadata.siteUrl}/o-nama`,
      languages: {
        'sr-Latn': `${siteMetadata.siteUrl}/sr-Latn/o-nama`,
        'sr-Cyrl': `${siteMetadata.siteUrl}/sr-Cyrl/o-nama`,
      },
    },    
  };
}

const AboutUs = () => {
  return (
    <>
    <AboutUsComponent />
    </>
  )
}

export default AboutUs;