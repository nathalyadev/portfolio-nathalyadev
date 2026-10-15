"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiArrowLongRight, HiBars3, HiXMark } from "react-icons/hi2";
import { CtaLink } from "./CtaLink";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogoLink } from "./LogoLink";
import { NavLinks } from "./NavLinks";

const MOBILE_MAX_WIDTH = 769;

export const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Contato", href: "/#contato" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    const evaluate = () => {
      const viewportIsMobile = window.innerWidth <= MOBILE_MAX_WIDTH;

      if (viewportIsMobile) {
        setIsCompact(true);
        return;
      }

      const bar = barRef.current;
      const measure = measureRef.current;

      if (!bar || !measure) {
        setIsCompact(false);
        setIsMenuOpen(false);
        return;
      }

      const fits = measure.scrollWidth <= bar.clientWidth;
      setIsCompact(!fits);

      if (fits) {
        setIsMenuOpen(false);
      }
    };

    evaluate();

    const resizeObserver = new ResizeObserver(evaluate);
    if (barRef.current) {
      resizeObserver.observe(barRef.current);
    }

    window.addEventListener("resize", evaluate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-cream">
      <div
        ref={barRef}
        className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-18 sm:px-8 nav:px-12"
      >
        <div
          ref={measureRef}
          aria-hidden
          className="pointer-events-none absolute top-0 left-[-9999px] flex items-center gap-10 whitespace-nowrap opacity-0"
        >
          <span className="inline-block h-7.5 w-51.5 shrink-0" />
          <span className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <span
                key={item.href}
                className="text-sm font-medium tracking-wide"
              >
                {item.label}
              </span>
            ))}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium">
            Vamos começar
            <HiArrowLongRight className="size-4" />
          </span>
        </div>

        <LogoLink onClick={() => setHash("")} />

        {!isCompact && (
          <>
            <NavLinks
              pathname={pathname}
              hash={hash}
              onHashChange={setHash}
              className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8 xl:gap-10"
              linkClassName="pb-1"
            />
            <CtaLink onClick={() => setHash("#contato")} />
          </>
        )}

        {isCompact && (
          <button
            type="button"
            className="-mr-1 flex size-10 items-center justify-center cursor-pointer text-black transition-opacity hover:opacity-70"
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <HiBars3 className="size-6" aria-hidden />
          </button>
        )}
      </div>

      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent
          showCloseButton={false}
          className="inset-0 top-0 left-0 flex h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-cream p-0 ring-0 data-open:zoom-in-100 data-closed:zoom-out-100 sm:max-w-none"
        >
          <DialogHeader className="flex flex-row items-center justify-between px-5 py-4 sm:px-8">
            <DialogTitle className="sr-only">Menu de navegação</DialogTitle>
            <LogoLink
              onClick={() => {
                setHash("");
                setIsMenuOpen(false);
              }}
            />
            <DialogClose
              className="-mr-1 flex size-10 items-center justify-center cursor-pointer text-black transition-opacity hover:opacity-70"
              aria-label="Fechar menu"
            >
              <HiXMark className="size-6" aria-hidden />
            </DialogClose>
          </DialogHeader>

          <div className="flex flex-1 flex-col px-5 pb-10 sm:px-8">
            <NavLinks
              pathname={pathname}
              hash={hash}
              onHashChange={setHash}
              className="flex flex-col gap-1"
              linkClassName="py-3 text-base"
              underline="text"
              onNavigate={() => setIsMenuOpen(false)}
            />

            <CtaLink
              className="mt-8 w-fit"
              onClick={() => {
                setHash("#contato");
                setIsMenuOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
