"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";
import type { FaqItem as FaqItemType } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqList({ items }: { items: FaqItemType[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <ul className="divide-y divide-beige border-y border-beige">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <li key={item.id}>
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="text-sm font-medium text-black sm:text-base">
                {item.question}
              </span>
              <HiChevronDown
                aria-hidden
                className={cn(
                  "size-5 shrink-0 text-gray transition-transform",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-gray">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
