import { DM_Serif_Display, Manrope } from "next/font/google";

import { Footer } from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import "@/global/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${dmSerifDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
