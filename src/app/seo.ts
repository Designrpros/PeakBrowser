import type { Metadata } from "next";

export const siteUrl = "https://www.peakbrowser.app";
export const siteName = "Peak Browser";
export const appStoreUrl = "https://apps.apple.com/app/peak-browser/id6753611346";

export const defaultDescription =
  "Peak Browser is a native Apple browser workspace for quick lookups, saved context, private profiles, optional AI, whiteboards, and nearby collaboration.";

export const ogImage = {
  url: "/peak-logo.png",
  width: 2000,
  height: 2000,
  alt: "Peak Browser app icon",
};

type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      images: [ogImage],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteName,
  applicationCategory: "BrowserApplication",
  operatingSystem: "macOS, iOS, iPadOS",
  description: defaultDescription,
  url: siteUrl,
  image: `${siteUrl}${ogImage.url}`,
  downloadUrl: appStoreUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "Peak Browser",
    url: siteUrl,
  },
};
