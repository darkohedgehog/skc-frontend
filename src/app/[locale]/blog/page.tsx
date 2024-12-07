import siteMetadata from '@/app/utils/siteMetaData';
import Blog from '@/components/blog/Blog'
import React from 'react'

export async function generateMetadata() {
  const pageTitle = "Najnovije vijesti";
  const pageDescription = "Pratite nanovija dešavanja i događaje";

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteMetadata.siteUrl}/blog`,
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
      canonical: `${siteMetadata.siteUrl}/blog`,
      languages: {
        'sr-Latn': `${siteMetadata.siteUrl}/sr-Latn/blog`,
        'sr-Cyrl': `${siteMetadata.siteUrl}/sr-Cyrl/blog`,
      },
    },    
  };
}






const BlogPage = () => {
  return (
    <>
    <Blog />
    </>
  )
}

export default BlogPage