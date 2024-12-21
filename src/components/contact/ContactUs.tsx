import Link from 'next/link';
import React from 'react'
import { FiFacebook } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useTranslations } from 'next-intl';

const ContactUs = () => {
    const t = useTranslations('ContactUs');

  return (
    <section className="container my-16">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-accent dark:text-accentDark uppercase flex items-center justify-center">
            {t('title')}
          </h2>
        </div>
        <div className="mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg shadow-gray dark:shadow-accentDark">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2804.0235948853733!2d18.995057676250692!3d45.34833597107229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475c8fa4b4d1bc5b%3A0xb0c05391994d56da!2sUl.%20Eugena%20Kvaternika%201%2C%2032000%2C%20Vukovar!5e0!3m2!1shr!2shr!4v1733417867898!5m2!1shr!2shr" width="600" height="500"
             allowFullScreen={true}
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            </div>
            <div>
              <div className="max-w-full mx-auto rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-accent dark:text-darkpurple">
                    {t('paragraph')}
                  </h3>
                  <p className="mt-1 text-blue-500">
                   {t('skc')}
                  </p>
                  <p className="mt-1 text-gray">
                   {t('address1')}
                  </p>
                  <p className="mt-1 text-gray">
                  {t('address2')}
                  </p>
                  <p className="mt-1 text-blue-500">
                  {t('biblioteka')}
                  </p>
                  <p className="mt-1 text-gray">
                  {t('address1')}
                  </p>
                  <p className="mt-1 text-gray">
                  {t('address2')}
                  </p>
                </div>
                <div className="border-t border-gray px-6 py-4">
                  <h3 className="text-lg font-medium text-accent dark:text-darkpurple">
                  {t('worktime')}
                  </h3>
                  <p className="mt-1 text-gray">
                  {t('time')}
                  </p>
                </div>
                <div className="border-t border-gray px-6 py-4">
                  <h3 className="text-lg font-medium text-accent dark:text-darkpurple">
                  {t('contact')}:
                    </h3>
                  <Link 
                   href={'mailto:direktor@skcvukovar.hr'} target='blank'
                  className="mt-1 text-gray">
                    Email: direktor@skcvukovar.hr
                  </Link>
                  <p className="mt-1 text-gray">
                  {t('phone')}: +385 32 541-992
                    </p>
                </div>
                <span className="inline-flex mx-4">
                  <Link 
                  className="text-blue-500" 
                  href={'https://www.facebook.com/skcvukovar'} target='blank'>
                  <FiFacebook className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="text-blue-500 mx-2" 
                  href={'https://web.facebook.com/skcvukovar?_rdc=1&_rdr'} target='blank'>
                  <RiMessengerLine className='h-6 w-6' />
                  </Link>
                  <Link 
                  className="mx-2 text-blue-500" 
                  href={'mailto:direktor@skcvukovar.hr'} target='blank'>
                  <MdOutlineAlternateEmail className='h-6 w-6' />
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs;