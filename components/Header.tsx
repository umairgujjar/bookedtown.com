"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Globe, MapPin, TrendingUp, Star, PhoneMissed, RefreshCw, Megaphone, Info, MessageSquareQuote, Menu, X, ChevronDown, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BookButton from "./BookButton";
import { ARTICLES } from "../lib/resources";

type Item = { href: string; label: string; desc: string; Icon: LucideIcon };

const PRODUCT: { title: string; items: Item[] }[] = [
  {
    title: "Get found",
    items: [
      { href: "/services/website", label: "Lead-generating website", desc: "A page for every service and town", Icon: Globe },
      { href: "/services/google-business-profile", label: "Google Business Profile", desc: "Rank higher on Google Maps", Icon: MapPin },
      { href: "/services/local-seo", label: "Monthly SEO and AI search", desc: "Two articles and a new page a month", Icon: TrendingUp },
    ],
  },
  {
    title: "Get chosen",
    items: [
      { href: "/services/reviews", label: "Review requests", desc: "Feedback first, Google link for all", Icon: Star },
      { href: "/services/missed-call-text-back", label: "Missed-call text-back", desc: "Auto text within seconds", Icon: PhoneMissed },
      { href: "/services/customer-reactivation", label: "Customer reactivation", desc: "Wake up past customers", Icon: RefreshCw },
    ],
  },
  {
    title: "Grow faster",
    items: [
      { href: "/services/google-ads", label: "Google Ads", desc: "Optional add-on, tracked to bookings", Icon: Megaphone },
    ],
  },
];

const COMPANY: Item[] = [
  { href: "/about", label: "About", desc: "Who we are and how we operate", Icon: Info },
  { href: "/testimonials", label: "Testimonials", desc: "What clients say about our team", Icon: MessageSquareQuote },
];

const TOP = [
  { href: "/work", label: "Our work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/case-studies", label: "Case studies" },
];

function MenuLink({ item, onClick }: { item: Item; onClick: () => void }) {
  const { Icon } = item;
  return (
    <Link href={item.href} className="mi" onClick={onClick}>
      <span className="mi-icon"><Icon size={18} strokeWidth={2} aria-hidden="true" /></span>
      <span><b>{item.label}</b><small>{item.desc}</small></span>
    </Link>
  );
}

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState<null | "product" | "company">(null);
  const [mobile, setMobile] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const close = () => { setOpen(null); setMobile(false); };

  useEffect(() => { close(); }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, []);

  const current = (href: string) => (path === href || path.startsWith(href + "/") ? "page" : undefined);
  const inCompany = COMPANY.some((c) => path === c.href);
  const inProduct = path.startsWith("/services");
  const latest = ARTICLES.slice(0, 3);

  return (
    <header ref={ref}>
      <div className="wrap nav">
        <Link className="logo" href="/" aria-label="Booked Town home">
          <Image src="/logo.png" alt="Booked Town" width={149} height={46} priority />
        </Link>

        <ul className="menu">
          <li onMouseEnter={() => setOpen("product")} onMouseLeave={() => setOpen(null)}>
            <button type="button" className={`trig${inProduct ? " cur" : ""}`} aria-expanded={open === "product"} aria-haspopup="true" onClick={() => setOpen(open === "product" ? null : "product")}>
              Product <ChevronDown size={15} aria-hidden="true" className="chev" />
            </button>
            {open === "product" && (
              <div className="panel pwide" role="menu">
                <div className="pcols">
                  {PRODUCT.map((g) => (
                    <div key={g.title}>
                      <p className="ptitle">{g.title}</p>
                      {g.items.map((it) => <MenuLink key={it.href} item={it} onClick={close} />)}
                    </div>
                  ))}
                </div>
                <div className="pfoot"><Link href="/services" onClick={close}>See the whole system <ArrowRight size={15} aria-hidden="true" /></Link></div>
              </div>
            )}
          </li>
          {TOP.map((t) => (
            <li key={t.href}><Link href={t.href} aria-current={current(t.href)}>{t.label}</Link></li>
          ))}
          <li onMouseEnter={() => setOpen("company")} onMouseLeave={() => setOpen(null)}>
            <button type="button" className={`trig${inCompany ? " cur" : ""}`} aria-expanded={open === "company"} aria-haspopup="true" onClick={() => setOpen(open === "company" ? null : "company")}>
              Company <ChevronDown size={15} aria-hidden="true" className="chev" />
            </button>
            {open === "company" && (
              <div className="panel pcompany" role="menu">
                <div>
                  {COMPANY.map((it) => <MenuLink key={it.href} item={it} onClick={close} />)}
                </div>
                <div className="platest">
                  <p className="ptitle">Latest resources</p>
                  {latest.map((a) => (
                    <Link key={a.slug} href={`/resources/${a.slug}`} onClick={close}>
                      <b>{a.title}</b><small>{a.mins} min read</small>
                    </Link>
                  ))}
                  <Link className="pall" href="/resources" onClick={close}>View all resources <ArrowRight size={15} aria-hidden="true" /></Link>
                </div>
              </div>
            )}
          </li>
        </ul>

        <div className="navright">
          <BookButton className="btn">Book a free call</BookButton>
          <button type="button" className="burger" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            {mobile ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobile && (
        <nav className="mobnav" aria-label="Mobile">
          <p className="ptitle">Product</p>
          {PRODUCT.flatMap((g) => g.items).map((it) => <Link key={it.href} href={it.href} onClick={close}>{it.label}</Link>)}
          <p className="ptitle">Pages</p>
          {TOP.map((t) => <Link key={t.href} href={t.href} onClick={close}>{t.label}</Link>)}
          <p className="ptitle">Company</p>
          {COMPANY.map((c) => <Link key={c.href} href={c.href} onClick={close}>{c.label}</Link>)}
          <Link href="/resources" onClick={close}>Resources</Link>
          <Link href="/contact" onClick={close}>Contact</Link>
        </nav>
      )}
    </header>
  );
}
