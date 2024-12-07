import siteMetadata from '@/app/utils/siteMetaData';
import ContactUs from '@/components/contact/ContactUs';
import React from 'react';

export async function generateMetadata() {
  const pageTitle = "Kontakt";
  const pageDescription = "Ostanimo u kontaktu";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/kontakt`,
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
      canonical: `${siteMetadata.siteUrl}/kontakt`,
      languages: {
        'sr-Latn': `${siteMetadata.siteUrl}/sr-Latn/kontakt`,
        'sr-Cyrl': `${siteMetadata.siteUrl}/sr-Cyrl/kontakt`,
      },
    },    
  };
}

const ContactPage = () => {
  return (
    <>
      <ContactUs />
    </>
  )
}

export default ContactPage;