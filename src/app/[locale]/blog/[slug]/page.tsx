"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BlogSlugType } from "../../../../../types";
import { ParallaxScrollBlog } from "@/components/blog/ParallaxScrollBlog";
import { useRouter } from 'next/navigation';
import { IoReturnDownBackOutline } from "react-icons/io5";
import Link from "next/link";

async function fetchBlogBySlug(slug: string, locale: string): Promise<BlogSlugType | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

const BlogDetail = () => {
  const t = useTranslations("BlogDetail");
  const [blog, setBlog] = useState<BlogSlugType | null>(null);
  const { slug } = useParams() as { slug: string };
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (slug) {
      const getBlogDetail = async () => {
        const blogData = await fetchBlogBySlug(slug, locale);
        if (blogData) {
          setBlog(blogData);
        } else {
          console.error(`No blog found for slug: ${slug} and locale: ${locale}`);
        }
      };
      getBlogDetail();
    }
  }, [slug, locale]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center text-accent h-screen mt-40">
        {t("loading")}
      </div>
    );
  }

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const thumbnailUrl = blog.image?.formats?.medium?.url ||
                       blog.image?.formats?.small?.url ||
                       blog.image?.url;

  return (
    <div className="px-10 md:px-20 py-8">
      <h1 className="text-2xl uppercase font-bold mb-16 text-center text-accent dark:text-accentDark">
        {blog.title}
      </h1>
      <p className="mb-6 text-lg text-darkblue dark:text-blue-500 flex items-center justify-start gap-2 font-semibold">
               <span className="text-neutral-800 dark:text-gray">
               {t("published")}:
                </span> 
               {formatDate(blog.published)}
              </p>
      {thumbnailUrl ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${thumbnailUrl}`}
          alt={blog.title}
          width={300}
          height={200}
          priority
          className="rounded-xl object-cover h-96 w-3/4 mx-auto shadow-md shadow-accent"
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-200 rounded-lg"></div>
      )}

      <p className="mt-16 text-neutral-800 dark:text-gray text-lg">{blog.content}</p>

      {blog.gallery && blog.gallery.length > 0 && (
         <div className="mt-8">
           <ParallaxScrollBlog gallery={blog.gallery} />
         </div>
        )}

      {blog.category && blog.category.length > 0 && (
        <div className="mt-14">
          <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-gray">{t("category")}:</h3>
          <ul>
            {blog.category.map((cat) => (
              <li key={cat.id} className="text-accent dark:text-accentDark">
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      )}

{blog.localizations && blog.localizations.length > 0 && (
  <div className="mt-8">
    <h3 className="text-lg mb-4 text-neutral-800 dark:text-gray">
    {t("language")}:
    </h3>
    <ul>
      {blog.localizations.map((loc) => (
        <li key={loc.id}>
          <Link href={`/${loc.locale}/blog/${loc.slug}`} passHref>
            <p className="text-accent dark:text-accentDark hover:underline cursor-pointer">
              <strong>{loc.locale}</strong>: {loc.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}

      <div className="flex items-center justify-center my-20">
      <button className='flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]"'
        onClick={() => router.back()}>
          <span className='text-white uppercase text-sm flex items-center justify-center gap-2'>
          <IoReturnDownBackOutline className='w-5 h-5' />
          {t('button')}
            </span>
        </button>
        </div>
    </div>
    
  );
};

export default BlogDetail;
