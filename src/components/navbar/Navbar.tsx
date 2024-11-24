"use client";

import { cn } from "@/lib/utils";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../logo/Logo";
import LangSwitch from "../header/LangSwitch";
import { ModeToggle } from "../hooks/useThemeSwitch";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export function NavbarWithChildren() {
  return (
    <div className="sticky top-0 z-50">
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
      link: "/",
      children: [
        { name: t("title2"), link: "/o-nama" },
        { name: t("title3"), link: "/direktor" },
        { name: t("title4"), link: "/statut" },
        { name: t("title5"), link: "/izvestaji" },
      ],
    },
    {
      name: t("title6"),
      link: "/kultura",
      children: [
        { name: t("title7"), link: "/biblioteka" },
        { name: t("title11"), link: "/arhivska-gradja" },
      ],
    },
    { name: t("title9"), link: "/kontakt" },
  ];

  return (
    <div className="w-full">
      <DesktopNav navItems={navItems} />
      <MobileNav navItems={navItems} />
    </div>
  );
};

const DesktopNav = ({ navItems }: any) => {
  const [active, setActive] = useState<string | null>(null);
  const t = useTranslations("NavBar");

  return (
    <motion.div
      className={cn(
        "hidden lg:flex flex-row self-start bg-card-bg-light dark:bg-card-bg-dark items-center justify-between py-2 max-w-7xl mx-auto px-4 rounded-full relative z-[60] w-full",
        "sticky top-40 inset-x-0"
      )}
    >
      <Logo />
      <div className="lg:flex flex-row flex-1 hidden items-center justify-center space-x-2 lg:space-x-2 text-sm text-zinc-600 font-medium hover:text-zinc-800 transition duration-200">
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item={t("title1")}>
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/o-nama">{t("title2")}</HoveredLink>
              <HoveredLink href="/direktor">{t("title3")}</HoveredLink>
              <HoveredLink href="/statut">{t("title4")}</HoveredLink>
              <HoveredLink href="/izvestaji">{t("title5")}</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item={t("title6")}>
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title={t("title10")}
                href="/biblioteka"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description={t("paragraph1")}
              />
              <ProductItem
                title={t("title11")}
                href="/arhivska-gradja"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description={t("paragraph2")}
              />
            </div>
          </MenuItem>
          <Link
            href="/kontakt"
            className="text-zinc-100 font-medium hover:text-zinc-800 transition duration-200"
          >
            {t("title9")}
          </Link>
        </Menu>
      </div>
      <div className="flex items-center justify-center gap-3">
        <LangSwitch />
        <ModeToggle />
      </div>
    </motion.div>
  );
};



const MobileNav = ({ navItems }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        animate={{
          borderRadius: open ? "4px" : "2rem",
        }}
        key={String(open)}
        className="flex relative flex-col lg:hidden w-full justify-between items-center bg-white dark:bg-neutral-950  max-w-[calc(100vw-2rem)] mx-auto px-4 py-2"
      >
        <div className="flex flex-row justify-between items-center w-full">
          <Logo />
          {open ? (
            <IconX
              className="text-black dark:text-white"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <IconMenu2
              className="text-black dark:text-white"
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
              {navItems.map((navItem: any, idx: number) => (
                <div key={`navItem-${idx}`} className="w-full">
                  {navItem.children ? (
                    <MobileChildNavItems navItem={navItem} />
                  ) : (
                    <Link
                      href={navItem.link}
                      className="relative text-neutral-600 dark:text-neutral-300"
                    >
                      <motion.span className="block">
                        {navItem.name}
                      </motion.span>
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex items-center justify-center gap-3">
             <LangSwitch />
             <ModeToggle />
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
        className="relative text-neutral-600 dark:text-neutral-300 flex w-full justify-between"
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
            className="pl-4"
          >
            {navItem.children.map((child: any, childIdx: number) => (
              <Link
                key={`child-${childIdx}`}
                href={child.link}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <motion.span className="block">{child.name}</motion.span>
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
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-neutral-700 dark:text-neutral-300 hover:opacity-[0.9] "
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
            <div className="absolute top-[calc(100%_+_0.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <div className="">
                <motion.div
                  transition={transition}
                  layoutId="active" // layoutId ensures smooth animation
                  className="bg-white dark:bg-neutral-950 mt-4 backdrop-blur-sm rounded-2xl overflow-hidden  shadow-xl"
                >
                  <motion.div
                    layout // layout ensures smooth animation
                    className="w-max h-full p-4"
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </div>
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
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full dark:bg-neutral-950  bg-white flex justify-center space-x-4 px-4 py-3 "
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
    <Link href={href} className="flex gap-4">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-base font-normal mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
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
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
