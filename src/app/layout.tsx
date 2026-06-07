import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";

const DESCRIPTION =
  "Full-Stack Product Engineer based in Kashmir, India. Building end-to-end products with NestJS, Next.js, and everything in between.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aaqif.is-a.dev"),
  title: "Aaqif Shafi — Full-Stack Product Engineer",
  description: DESCRIPTION,
  openGraph: {
    title: "Aaqif Shafi — Full-Stack Product Engineer",
    description: DESCRIPTION,
    url: "/",
    siteName: "Aaqif Shafi",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aaqif Shafi — Full-Stack Product Engineer",
    description: DESCRIPTION,
    creator: "@aaqifshafi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        GeistPixelSquare.variable,
        "font-sans",
      )}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <MotionProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
