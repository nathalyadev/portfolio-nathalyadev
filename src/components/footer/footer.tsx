import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { FooterNav } from "./FooterNav";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="bg-[#18383c] py-10 sm:py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="relative shrink-0 transition-opacity hover:opacity-80"
          aria-label="Nathálya Souza — página inicial"
        >
          <Image
            src="/logo.svg"
            alt="Nathálya Souza"
            width={206}
            height={34}
            className="h-6 w-auto brightness-0 invert sm:h-7"
          />
        </Link>

        <FooterNav className="justify-center" />
        <SocialLinks className="justify-start sm:justify-end" />
      </Container>
    </footer>
  );
}
