"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export default function AboutSection() {
  return (
    <>
    <h1 className="flex items-center justify-center pt-10 mt-20 text-accent dark:text-accentDark text-4xl lg:text-5xl font-semibold">
        Naša delatnost
    </h1>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full pt-10 mt-20">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Čuvari tradicije
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          Čuvanje i unapređenje tradicionalnih, kulturnih i umetničkih izraza područja koje pokriva Ustanova, čuva, razvija i unapređuje sve oblike kulturnog i umetničkog stvaralaštva...
          </p>
        </div>
        <Image
          src="/traditional.jpg"
          width={500}
          height={500}
          alt="Uskrs"
          className="absolute -right-4 lg:-right-[5%] -bottom-10 object-contain rounded-2xl h-80 w-auto lg:h-auto"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
         Kultura i umetnost
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        Organizacija svih oblika zabavnih, kulturnih i umetničkih potreba srpske etničke zajednice
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Prikupljamo i stručno obrađujemo, čuvamo i obnavljamo bibliotečku građu
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          U okviru Ustanove deluje biblioteka „Zaharija Orfelin“ kao i ogranak Vukove zadužbine
          </p>
        </div>
        <Image
          src="/vuk-karadzic.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[3%] -bottom-1 object-contain rounded-2xl h-80 lg:h-auto w-auto"
        />
      </WobbleCard>
    </div>
    </>
  );
}
