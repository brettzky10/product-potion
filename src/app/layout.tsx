import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider"
import { Toaster } from 'sonner'
import StripeModalProvider from "@/lib/providers/stripe-modal-provider";
import { ModalProvider } from "@/lib/providers/modal-provider";
import { BillingProvider } from "@/lib/providers/billing-provider";
import QueryProvider from "@/lib/providers/query-provider";
import { ReduxProvider } from "@/lib/providers/redux/provider";
import Transition from "./transition";


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
	metadataBase: new URL("https://productpotion.com/"),

	title: {
		template: "%s | Product Potion",
		default: "Product Potion",
	},
	authors: {
		name: "Brett",
	},

	description:
		"Your elixir to multi-buisness success! Build & manage multiple stores from one dashboard.",
	openGraph: {
		title: "Product Potion",
		description:
			"Your elixir to business success! Build & manage multiple stores from one dashboard.",
		url: "https://productpotion.vercel.app/",
		siteName: "Product Potion",
		images: "/og.png",
		type: "website",
	},
	keywords: ["Buid multiple stores", "product potion", "product stores"],
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
            <ReduxProvider>
            <QueryProvider>
            <Transition>
              {children}
            </Transition>
            </QueryProvider>
            </ReduxProvider>
            </StripeModalProvider>
            </BillingProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
