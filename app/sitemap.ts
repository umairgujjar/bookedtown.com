import type { MetadataRoute } from "next";
import { SERVICES } from "../lib/services";
import { ARTICLES } from "../lib/resources";
import { SITE_URL } from "../lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/how-it-works", "/work", "/case-studies", "/testimonials", "/pricing", "/about", "/contact", "/resources", "/privacy", "/terms", "/refund-policy", "/cancellation-policy"];
  const all = [
    ...pages,
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...ARTICLES.map((a) => `/resources/${a.slug}`),
  ];
  return all.map((p) => ({ url: SITE_URL + p, lastModified: new Date() }));
}
