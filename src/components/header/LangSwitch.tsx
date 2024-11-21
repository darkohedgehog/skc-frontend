"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Switch } from "../ui/Switch";
import { IoLanguageSharp } from "react-icons/io5";

const LangSwitch = () => {
  const locale = useLocale(); // Trenutni jezik
  const pathname = usePathname(); // Trenutna ruta
  const router = useRouter(); // Router za navigaciju
  const [isCyrillic, setIsCyrillic] = useState(locale === "sr-Cyrl");

  const handleLanguageToggle = () => {
    const newLocale = isCyrillic ? "sr-Latn" : "sr-Cyrl"; // Prebaci jezik
    setIsCyrillic(!isCyrillic);

    // Ukloni trenutni prefiks jezika iz pathname
    const cleanPathname = pathname.replace(/^\/(sr-Cyrl|sr-Latn)/, "");

    // Dodaj novi prefiks jezika
    router.push(`/${newLocale}${cleanPathname}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="language-mode"
        checked={isCyrillic}
        onCheckedChange={handleLanguageToggle}
      />
      <IoLanguageSharp className="text-xl text-gray-600 dark:text-gray-300" />
    </div>
  );
};

export default LangSwitch;
