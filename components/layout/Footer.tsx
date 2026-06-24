import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-10 py-14">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" aria-label="JobPilot home" className="shrink-0">
          <Image src="/logo.png" alt="JobPilot" width={118} height={40} />
        </Link>

        <div className="flex flex-wrap items-center gap-8">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium leading-5 text-text-dark hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
