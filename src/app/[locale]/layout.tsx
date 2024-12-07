import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from 'next-themes';
import { NavbarWithChildren } from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import CookiesToast from '@/components/cookies/CookiesToast';
import siteMetadata from '../utils/siteMetaData';

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
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`, // Full URL for social banner
        width: 1200, // Default width for social banners
        height: 630, // Default height for social banners
        alt: siteMetadata.title,
      },
    ],
    locale: siteMetadata.locale,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`], // Full URL for social banner
    site: '@Zivic_Darko',
  },
};

type Locale = (typeof routing.locales)[number];

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { params } = props;
  const locale = (await params).locale as Locale; // Await the params here

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Gradient kao pozadina */}
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-gradient-light dark:bg-gradient-dark"></div>
            {/* Sadržaj aplikacije */}
            <div className="relative z-10">
              <NavbarWithChildren />
              {props.children}
              <CookiesToast />
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
