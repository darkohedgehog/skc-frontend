// app/[locale]/layout.tsx
import type { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from 'next-themes';
import { NavbarWithChildren } from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import CookiesToast from '@/components/cookies/CookiesToast';
import siteMetadata from '../utils/siteMetaData';

// Metadata za ovaj segment (bez ručnog <head>)
export const metadata = {
  metadataBase: siteMetadata.siteUrl,
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    locale: siteMetadata.locale,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`],
    site: '@Zivic_Darko',
  },
  // umesto ručnog <meta name="google-site-verification" ... />
  verification: {
    google: 'dhF1KyQbjqzM2WFcOWwvOFwOW_m2mLq2VVyIavbzqpg',
  },
};

type Locale = (typeof routing.locales)[number];

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const currentLocale = (locale ?? routing.defaultLocale) as Locale;

  // validacija locale-a (umesto hasLocale)
  if (!routing.locales.includes(currentLocale)) {
    notFound();
  }

  // obavesti next-intl koji je locale za ovaj request
  setRequestLocale(currentLocale);

  // povlači poruke na osnovu i18n/request.ts
  const messages = await getMessages();

  // ⛔ ovde NEMA <html>, <head>, <body> — to radi root layout
  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {/* Gradient kao pozadina */}
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-gradient-light dark:bg-gradient-dark" />
        {/* Sadržaj aplikacije */}
        <div className="relative z-10">
          <NavbarWithChildren />
          {children}
          <CookiesToast />
          <Footer />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}