"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import { useTranslations } from "next-intl";

export default function AboutUsComponent() {
  const t = useTranslations("AboutUsComponent");
  return (
    <div className="flex justify-center flex-col items-center px-4 my-24">
      <h1 className="flex items-center justify-center bg-gradient-to-br from-slate-400 to-slate-700 dark:from-slate-300 dark:to-slate-500 py-6 mb-12 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-4xl">
        {t('title')}
      </h1>
      <div className="text-neutral-500 dark:text-gray text-xl max-w-5xl mx-auto mb-10">
        {t('paragraph1')} {" "}
        <LinkPreview url="https://zvo.hr/" className="font-bold">
        {t('paragraph2')}
        </LinkPreview>
        {t('paragraph3')}
      </div>
      <div className="text-neutral-500 dark:text-gray text-xl max-w-5xl mx-auto mb-4">
      {t('paragraph4')}
        <br />
        {t('paragraph5')}
      </div>
    </div>
  );
}
