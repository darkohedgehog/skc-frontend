"use client";

import { cn } from "@/lib/utils";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../logo/Logo";
import LangSwitch from "../header/LangSwitch";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import DyslexiaToggle from "../hooks/DyslexiaToggle";
import dynamic from "next/dynamic";
const ModeToggle = dynamic(
  () => import("../hooks/useThemeSwitch").then((m) => m.ModeToggle),
  { ssr: false }
);

export function NavbarWithChildren() {
  return (
    <div className="sticky top-1 z-50">
      <Navbar />
    </div>
  );
}

const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations("NavBar");
  const pathSegments = pathname.split("/");
  const currentLocale = pathSegments[1] || "sr-Latn";

  const navItems = [
    {
      name: t("title1"),
      link: `/${currentLocale}/`,
      children: [
        { name: t("title13"), link: `/${currentLocale}/` },
        { name: t("title2"), link: `/${currentLocale}/o-nama` },
        { name: t("title3"), link: `/${currentLocale}/direktor` },
        { name: t("title4"), link: `/${currentLocale}/statut` },
        { name: t("title5"), link: `/${currentLocale}/izvestaji` },
        { name: t("title12"), link: `/${currentLocale}/blog` },
      ],
    },
    {
      name: t("title6"),
      link: `/${currentLocale}/kultura`,
      children: [
        { name: t("title7"), link: `/${currentLocale}/biblioteka` },
        { name: t("title11"), link: `/${currentLocale}/arhivska-gradja` },
      ],
    },
    { name: t("title9"), link: `/${currentLocale}/kontakt` },
  ];

  return (
    <div className="w-full">
      <DesktopNav />
      <MobileNav navItems={navItems} />
    </div>
  );
};

const DesktopNav = () => {
  const [active, setActive] = useState<string | null>(null);
  const t = useTranslations("NavBar");
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const currentLocale = pathSegments[1] || "sr-Latn";

  return (
    <motion.div
      className={cn(
        "hidden lg:flex flex-row self-start dark:bg-card-bg-dark bg-[#c0c0c0] items-center justify-between py-2 max-w-7xl mx-auto px-4 rounded-full relative z-[60] w-full",
        "sticky top-40 inset-x-0"
      )}
    >
      <Logo />
      <div className="lg:flex flex-row flex-1 hidden items-center justify-center space-x-2 lg:space-x-2 text-sm text-accent dark:text-accentDark font-medium hover:text-zinc-800 transition duration-200">
        <Menu setActive={setActive}>
          {/* Dropdown: O nama, Statut, Izvještaji, Blog... */}
          <MenuItem setActive={setActive} active={active} item={t("title1")}>
            <div className="flex flex-col space-y-4 text-sm mx-auto px-4 min-w-[240px] my-2">
              <HoveredLink href={`/${currentLocale}/`}>
                {t("title13")}
              </HoveredLink>
              <HoveredLink href={`/${currentLocale}/o-nama`}>
                {t("title2")}
              </HoveredLink>
              <HoveredLink href={`/${currentLocale}/direktor`}>
                {t("title3")}
              </HoveredLink>
              <HoveredLink href={`/${currentLocale}/statut`}>
                {t("title4")}
              </HoveredLink>
              <HoveredLink href={`/${currentLocale}/izvestaji`}>
                {t("title5")}
              </HoveredLink>
              <HoveredLink href={`/${currentLocale}/blog`}>
                {t("title12")}
              </HoveredLink>
            </div>
          </MenuItem>

          {/* Dropdown: Kultura -> 2 kartice u dve kolone */}
          <MenuItem setActive={setActive} active={active} item={t("title6")}>
            <div
              className="
    text-sm 
    grid 
    grid-cols-1 md:grid-cols-2 
    items-start
    gap-10 
    p-6 
    min-w-[750px] 
    max-w-[1020px]
  "
            >
              <ProductItem
                title={t("title10")}
                href={`/${currentLocale}/biblioteka`}
                src="/assets/knjiga.webp"
                description={t("paragraph1")}
              />
              <ProductItem
                title={t("title11")}
                href={`/${currentLocale}/arhivska-gradja`}
                src="/assets/arhiva.webp"
                description={t("paragraph2")}
              />
            </div>
          </MenuItem>

          {/* Kontakt kao običan link */}
          <Link
            href={`/${currentLocale}/kontakt`}
            className="text-accent dark:text-accentDark font-medium hover:text-zinc-800 transition duration-200"
          >
            {t("title9")}
          </Link>
        </Menu>
      </div>
      <div className="flex items-center justify-center gap-3">
        <LangSwitch />
        <ModeToggle />
        <DyslexiaToggle />
      </div>
    </motion.div>
  );
};

const MobileNav = ({ navItems }: { navItems: any[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        animate={{
          borderRadius: open ? "4px" : "2rem",
        }}
        key={String(open)}
        className="flex relative flex-col lg:hidden w-full justify-between items-center bg-white dark:bg-card-bg-dark max-w-[calc(100vw-2rem)] mx-auto px-4 py-2"
      >
        <div className="flex flex-row justify-between items-center w-full">
          <Logo />
          {open ? (
            <IconX
              className="text-black dark:text-accentDark cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <IconMenu2
              className="text-black dark:text-accentDark cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex rounded-lg absolute top-16 bg-white dark:bg-neutral-950 inset-x-0 z-20 flex-col items-start justify-start gap-4 w-full px-4 py-8"
            >
              {navItems.map((navItem, idx: number) => (
                <div key={`navItem-${idx}`} className="w-full">
                  {navItem.children ? (
                    <MobileChildNavItems navItem={navItem} />
                  ) : (
                    <Link
                      href={navItem.link}
                      className="relative text-neutral-600 dark:text-accentDark"
                    >
                      <motion.span className="block">
                        {navItem.name}
                      </motion.span>
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex items-center justify-center gap-3 mt-4">
                <LangSwitch />
                <ModeToggle />
                <DyslexiaToggle />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

const MobileChildNavItems = ({ navItem }: { navItem: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-accent dark:text-accentDark flex w-full justify-between"
      >
        <motion.span className="block">{navItem.name}</motion.span>
        <IconChevronDown className="text-neutral-700 dark:text-neutral-300" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0 }}
            className="pl-4 mt-2 space-y-1"
          >
            {navItem.children.map((child: any, childIdx: number) => (
              <Link
                key={`child-${childIdx}`}
                href={child.link}
                className="relative block text-darkblue dark:text-darkpurple"
              >
                <motion.span className="block py-1">{child.name}</motion.span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-accent dark:text-accentDark hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.2rem)] left-1/2 -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-neutral-950 mt-4 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
              >
                <motion.div layout>{children}</motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full bg-[#dcdcdc] dark:bg-card-bg-dark flex justify-center space-x-4 px-4 py-3 border border-accentDark"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex gap-5 items-start w-full">
      <Image
        src={src}
        alt={title}
        width={200}
        height={140}
        priority={false}
        className="flex-shrink-0 w-44 h-32 object-cover rounded-md shadow-md"
      />

      <div className="flex flex-col flex-1 min-w-0">
        <h4 className="text-lg font-semibold mb-2 text-accent dark:text-accentDark">
          {title}
        </h4>

        <p className="text-darkblue text-sm dark:text-darkpurple max-w-[22rem] leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-gray dark:text-accentDark hover:text-darkblue w-44"
    >
      {children}
    </Link>
  );
};
