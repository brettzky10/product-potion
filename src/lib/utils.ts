import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { discountCodeType } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//Get Site Url
export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

//Upload Image to Supabase Convert blob to file
export async function convertBlobUrlToFile(blobUrl: string) {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const fileName = Math.random().toString(36).slice(2, 9);
  const mimeType = blob.type || "application/octet-stream";
  const file = new File([blob], `${fileName}.${mimeType.split("/")[1]}`, {
    type: mimeType,
  });
  return file;
}


export const formatter = new Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'USD',
})

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount)
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number)
}

const PERCENT_FORMATTER = new Intl.NumberFormat("en-US", { style: "percent" })

export function formatDiscountCode({
  discountAmount,
  discountType,
}: {
  discountAmount: number
  discountType: discountCodeType
}) {
  switch (discountType) {
    case "PERCENTAGE":
      return PERCENT_FORMATTER.format(discountAmount / 100)
    case "FIXED":
      return formatCurrency(discountAmount)
    default:
      throw new Error(
        `Invalid discount code type ${discountType satisfies never}`
      )
  }
}

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
})

export function formatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date)
}


// convert to camelCase
export const camelCase = (str: string) => {
  let camelCase = str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')

  return camelCase
}

export const truncateString = (string: string) => {
  return string.slice(0, 60) + "..."
}