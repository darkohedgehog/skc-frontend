const siteMetadata = require("./src/app/utils/siteMetaData");

module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: true,
  sitemapStylesheet: [
    {
      type: "text/xsl",
      styleFile: "/sitemap.xsl",
    },
  ],
  changefreq: 'daily',
  priority: 0.7,
  alternateRefs: [
    {
      href: `${siteMetadata.siteUrl}/sr-Latn`,
      hreflang: 'sr-Latn',
    },
    {
      href: `${siteMetadata.siteUrl}/sr-Cyrl`,
      hreflang: 'sr-Cyrl',
    },
  ],
  additionalPaths: async (config) => {
    return [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl`,
          },
        ],
      },
      {
        loc: '/o-nama',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/o-nama`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/o-nama`,
          },
        ],
      },
      {
        loc: '/blog',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/blog`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/blog`,
          },
        ],
      },
      {
        loc: '/biblioteka',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/biblioteka`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/biblioteka`,
          },
        ],
      },
      {
        loc: '/arhivska-gradja',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/arhivska-gradja`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/arhivska-gradja`,
          },
        ],
      },
      {
        loc: '/kontakt',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/kontakt`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/kontakt`,
          },
        ],
      },
      {
        loc: '/direktor',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/direktor`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/direktor`,
          },
        ],
      },
      {
        loc: '/izvestaji',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/izvestaji`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/izvestaji`,
          },
        ],
      },
      {
        loc: '/statut',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/statut`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/statut`,
          },
        ],
      },
      {
        loc: '/knjige',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/knjige`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/knjige`,
          },
        ],
      },
      {
        loc: '/pravila-privatnosti',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/pravila-privatnosti`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/pravila-privatnosti`,
          },
        ],
      },
      {
        loc: '/uslovi-koristenja',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternates: [
          {
            hreflang: 'sr-Latn',
            href: `${siteMetadata.siteUrl}/sr-Latn/uslovi-koristenja`,
          },
          {
            hreflang: 'sr-Cyrl',
            href: `${siteMetadata.siteUrl}/sr-Cyrl/uslovi-koristenja`,
          },
        ],
      },
      // Dodajte druge stranice po istom principu
    ];
  },
  transform: async (_config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
