import { HiChevronDown } from "react-icons/hi2";
import type { FaqItem as FaqItemType } from "@/data/faq";

export function FaqList({ items }: { items: FaqItemType[] }) {
  return (
    <ul className="flex w-full flex-col gap-4">
      {items.map((item, index) => (
        <li key={item.id}>
          <details
            className="group rounded-xl bg-white"
            open={index === 0 ? true : undefined}
          >
            <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left [&::-webkit-details-marker]:hidden">
              <span className="text-sm font-medium text-black sm:text-base">
                {item.question}
              </span>
              <HiChevronDown
                aria-hidden
                className="size-5 shrink-0 text-gray transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="px-4 pb-5 text-sm leading-relaxed text-gray">
              {item.answer}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
