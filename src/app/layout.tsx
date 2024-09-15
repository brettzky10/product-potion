import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider"
import { Toaster } from 'sonner'
import StripeModalProvider from "@/lib/providers/stripe-modal-provider";
import { ModalProvider } from "@/lib/providers/modal-provider";
import { BillingProvider } from "@/lib/providers/billing-provider";


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
	metadataBase: new URL("https://next-supabase-vote.vercel.app/"),

	title: {
		template: "%s | Launch Potion",
		default: "Launch Potion",
	},
	authors: {
		name: "Brett",
	},

	description:
		"Your elixir to business success! Let customers search products in any language and get traffic into your store faster.",
	openGraph: {
		title: "Launch Potion",
		description:
			"Your elixir to business success! Let customers search products in any language and get traffic into your store faster.",
		url: "https://next-supabase-vote.vercel.app/",
		siteName: "Launch Potion",
		images: "/og.png",
		type: "website",
	},
	keywords: ["search products language", "launch potion", "find products language"],
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
            <BillingProvider>
            <StripeModalProvider>
              {children}
            </StripeModalProvider>
            </BillingProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
