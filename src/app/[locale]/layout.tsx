import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { NavbarWithChildren } from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
    title: "Srpski kulturni centar",
    description: "Ustanova za kulturu Srpski kulturni centar",
  };
 
export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: { locale: string };
  }) {
    const locale = (await props.params).locale;
  
    if (!routing.locales.includes(locale as any)) {
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
             disableTransitionOnChange>
               {/* Gradient kao pozadina */}
            <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none bg-gradient-light dark:bg-gradient-dark">
            </div>
               {/* Sadržaj aplikacije */}
            <div className='relative z-10'>
             <NavbarWithChildren />
               {props.children}
              <Footer />
           </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}