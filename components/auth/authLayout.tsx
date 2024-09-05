"use client";

import { Image, Spinner } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import { Locale } from "next/dist/compiled/@vercel/og/satori";
import { useState, useEffect } from "react";
import { useTranslations } from "@/actions/localisation";

interface Props {
  children: React.ReactNode;
  lang: Locale;
}

export const AuthLayoutWrapper = ({ children, lang }: Props) => {
  const translations = useTranslations(lang, 'Login');

  if (!translations) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex-col flex items-center justify-center p-6">
        <div className="md:hidden absolute left-0 right-0 bottom-0 top-0 z-0">
          <Image
            className="w-full h-full"
            src="https://nextui.org/gradients/docs-right.png"
            alt="gradient"
          />
        </div>
        {children}
      </div>

      <div className="hidden my-10 md:block">
        <Divider orientation="vertical" />
      </div>

      <div className="hidden md:flex flex-1 relative items-center justify-center p-6">
        <div className="absolute left-0 right-0 bottom-0 top-0 z-0">
          <Image
            className="w-full h-full"
            src="https://nextui.org/gradients/docs-right.png"
            alt="gradient"
          />
        </div>

        <div className="z-10">
          <h1 className="font-bold text-[45px]">{translations.title}</h1>
          <div className="font-light text-slate-400 mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            possimus voluptate, sapiente assumenda deserunt repellendus,
            perferendis odit voluptas hic dolores laborum fugit ut? Architecto
            quo ex quidem vitae quae rem.
          </div>
        </div>
      </div>
    </div>
  );
};
