"use client"

import * as React from "react"
import { MdOutlineLightMode, MdOutlineDarkMode, MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useTranslations} from 'next-intl';

export function ModeToggle() {
  const { setTheme } = useTheme()
  const t = useTranslations('useTheme')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full border-accent dark:border-accentDark hover:dark:bg-accentDark">
          <MdOutlineLightMode className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-200" />
          <MdOutlineDarkMode className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-400" />
          <span className="sr-only"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
        className='gap-1 flex text-accent'
        onClick={() => setTheme("light")}>
        <MdOutlineLightMode />
          {t('title1')}
        </DropdownMenuItem>
        <DropdownMenuItem 
        className='gap-1 flex text-accent'
        onClick={() => setTheme("dark")}>
        <MdOutlineDarkMode />
        {t('title2')}
        </DropdownMenuItem>
        <DropdownMenuItem 
        className='gap-1 flex text-accent'
        onClick={() => setTheme("system")}>
        <MdOutlineSystemSecurityUpdateGood />
        {t('title3')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}