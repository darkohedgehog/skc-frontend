
  
  const siteMetadata = {
    title: 'Srpski kulturni centar||Vukovar',
    author: 'Darko Živić',
    headerTitle: 'Srpski kulturni centar Vukovar',
    description: 'Ustanova u oblasti kulture Srpski kulturni centar Vukovar',
    language: 'sr-Latn',
    theme: 'system', // system, dark or light
    siteUrl: process.env.SITE_URL || 'http://localhost:3000', // your website URL
    siteLogo: '/logo1.jpg',
    socialBanner: '/social-media.png', // add social banner in the public folder
    email: 'direktor@skcvukovar.hr',
    facebook: 'https://www.facebook.com/skcvukovar',
    locale: 'sr-Latn',
    keywords: [
      'Srpski kulturni centar',
      'Kultura',
      'Biblioteka Zaharije Orfelin',
      'Arhivska gradja',
      'radionice',
      'predavanja',
    ], // Additional SEO keywords
    robots: 'index, follow', // SEO - for search engine robots
    openGraph: {
      title: 'Srpski kulturni centar||Vukovar',
      description:
        'Ustanova u oblasti kulture Srpski kulturni centar Vukovar',
      url: process.env.SITE_URL || 'http://localhost:3000',
      type: 'website',
      images: [
        {
          url: '/social-media.png', // Social media banner
          alt: 'Srpski kulturni centar Vukovar social banner',
        },
      ],
    },
  };
  
  module.exports = siteMetadata;
  