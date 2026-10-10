import {
  FaBehance,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nathalyadev",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nathalya-souza-dev",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/nathalyadev",
    icon: FaGithub,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/nathalyadev",
    icon: FaBehance,
  },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-9 items-center justify-center text-cream/85 transition-colors hover:text-cream"
          >
            <Icon className="size-4" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
