import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';

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
          {props.children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}