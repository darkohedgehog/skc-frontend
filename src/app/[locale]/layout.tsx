import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { NavbarWithChildren } from '@/components/navbar/Navbar';

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
      <body className='transition-colors min-h-screen duration-300 bg-gradient-light dark:bg-gradient-dark'>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
             attribute="class"
             defaultTheme="system"
             enableSystem
             disableTransitionOnChange>
             <NavbarWithChildren />
          {props.children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}