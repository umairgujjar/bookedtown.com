import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "../lib/services";

export default function Footer() {
  return (
    <footer>
      <div className="wrap fgrid">
        <div>
          <Image src="/logo.png" alt="Booked Town" width={149} height={46} />
          <p className="note" style={{ marginTop: 14, maxWidth: 280 }}>Websites, Google Maps and SEO for US contractors. Get found. Get chosen. Get booked.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><Link href="/how-it-works">How it works</Link></li>
            <li><Link href="/work">Our work</Link></li>
            <li><Link href="/case-studies">Case studies</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><Link href="/privacy">Privacy policy</Link></li>
            <li><Link href="/terms">Terms of service</Link></li>
            <li><Link href="/refund-policy">Refund policy</Link></li>
            <li><Link href="/cancellation-policy">Cancellation policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap fbottom">
        <span>&copy; {new Date().getFullYear()} Booked Town. All rights reserved.</span>
      </div>
    </footer>
  );
}
