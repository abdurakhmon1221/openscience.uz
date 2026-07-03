import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenScience | Akademik Jurnal",
  description: "OpenScience - O'zbekistonning yetakchi ilmiy-tadqiqot va innovatsiyalar jurnali. Ilmiy maqolalar, nashrlar va arxiv.",
  keywords: ["OpenScience", "Ilmiy jurnal", "Maqolalar", "O'zbekiston", "Tadqiqotlar", "Akademik nashr", "Science"],
  authors: [{ name: "OpenScience Tahririyati" }],
  openGraph: {
    title: "OpenScience | Akademik Maqolalar",
    description: "O'zbekistonning yetakchi ilmiy-tadqiqot jurnali platformasi.",
    url: "https://openscience.com.uz",
    siteName: "OpenScience",
    locale: "uz_UZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1 flex flex-col w-full">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

