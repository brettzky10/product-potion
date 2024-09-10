import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider"
import { Toaster } from 'sonner'
import StripeModalProvider from "@/lib/providers/stripe-modal-provider";
import { ModalProvider } from "@/lib/providers/modal-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Launch Potion",
  description: "Elixir for Success",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster/>
            <ModalProvider/>
            <StripeModalProvider>
              {children}
            </StripeModalProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
