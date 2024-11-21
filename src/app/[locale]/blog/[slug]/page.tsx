"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BlogSlugType } from "../../../../../types";



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
      <div className="flex items-center justify-center text-accent h-screen">
        {t("loading")}
      </div>
    );
  }

  const thumbnailUrl = blog.image?.formats?.medium?.url || blog.image?.url;

  return (
    <div className="px-10 md:px-20 py-8">
      <h1 className="text-[24px] uppercase font-bold mb-16 text-center text-accent">
        {blog.title}
      </h1>
      {thumbnailUrl ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${thumbnailUrl}`}
          alt={blog.title}
          width={300}
          height={200}
          priority={false}
          className="rounded-lg object-cover h-40 w-72 mx-auto shadow-lg"
        />
      ) : (
        <div className="w-full h-[300px] bg-gray-200 rounded-lg"></div>
      )}

      <p className="mt-8 text-gray dark:text-white">{blog.content}</p>

      {blog.gallery && blog.gallery.length > 0 && (
        <div className="gallery grid grid-cols-2 gap-4 mt-8">
          {blog.gallery.map((image, index) => (
            <Image
              key={index}
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${image.formats?.medium?.url || image.url}`}
              alt={`Gallery image ${index + 1}`}
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
            />
          ))}
        </div>
      )}

      {blog.category && blog.category.length > 0 && (
        <div className="categories mt-8">
          <h3 className="text-lg font-semibold mb-4">Categories:</h3>
          <ul>
            {blog.category.map((cat) => (
              <li key={cat.id} className="text-accent">
                {cat.name} - {cat.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {blog.localizations && blog.localizations.length > 0 && (
        <div className="localizations mt-8">
          <h3 className="text-lg font-semibold mb-4">Available Localizations:</h3>
          <ul>
            {blog.localizations.map((loc) => (
              <li key={loc.id}>
                <p>
                  <strong>{loc.locale}</strong>: {loc.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
