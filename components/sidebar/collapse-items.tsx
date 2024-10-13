"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import { ChevronDownIcon } from "../icons/sidebar/chevron-down-icon";
import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import { createCustomCookie } from "@/actions/auth.action";

interface Item {
  id: number;
  name: string;
}

interface Props {
  icon: React.ReactNode;
  title: string;
  items: Item[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronDownIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12">
            {items.map((item) => (
              <NextLink
                key={item.id}
                href={`/en/${encodeURIComponent(item.name)}`} // Level name in the URL
                onClick={() =>
                  createCustomCookie("levelid", item.id.toString())
                } // Store the ID in localStorage
                className="w-full flex text-default-500 hover:text-default-900 transition-colors"
              >
                {item.name}
              </NextLink>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
