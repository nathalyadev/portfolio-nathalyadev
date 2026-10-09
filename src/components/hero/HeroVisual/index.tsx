import { cn } from "cn";
import Image from "next/image";

export function HeroVisual() {
  return (
    <div
      className={cn(
        "relative z-1 mx-auto h-[320px] lg:absolute ",
        "w-full max-w-lg lg:w-[62%]",
        "lg:inset-y-0 lg:right-0 lg:my-auto lg:h-[600px] lg:max-w-none",
      )}
    >
      <Image
        src="/images/hero/hero-visual.svg"
        alt="Mockup de notebook e tablet com interface de projeto digital"
        fill
        priority
        className="object-fill object-right"
        sizes="(max-width: 1024px) 90vw, 58vw"
      />
    </div>
  );
}
