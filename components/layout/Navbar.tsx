import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Find Jobs", href: "/find-jobs" },
  { label: "Profile", href: "/profile" },
];

export function Navbar() {
  return (
    <header className="flex h-16 items-center border-b border-border bg-surface px-10">
      <nav className="mx-auto flex w-full max-w-[1280px] items-center justify-between">
        <Link href="/" aria-label="JobPilot home" className="shrink-0">
          <Image src="/logo.png" alt="JobPilot" width={118} height={40} priority />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium leading-5 text-text-dark hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md bg-overlay px-5 text-sm font-medium leading-5 text-accent-foreground hover:bg-overlay-dark"
        >
          Start for free
        </Link>
      </nav>
    </header>
  );
}
