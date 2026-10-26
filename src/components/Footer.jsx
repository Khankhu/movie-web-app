import { Mail, Phone } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { SiThemoviedatabase } from "react-icons/si";
import { cn } from "@/lib/utils";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebook,
    hoverClassName: "hover:bg-[#1877F2]",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    hoverClassName: "hover:bg-[#E4405F]",
  },
  {
    name: "X",
    href: "https://x.com",
    icon: FaXTwitter,
    hoverClassName: "hover:bg-black",
  },
  {
    name: "Youtube",
    href: "https://youtube.com",
    icon: FaYoutube,
    hoverClassName: "hover:bg-[#FF0000]",
  },
];

const SUPPORT_LINKS = [
  { label: "Help Center", href: "/help" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const COMMUNITY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Release Calendar", href: "/calendar" },
  { label: "Newsletter", href: "/newsletter" },
];

export function Footer() {
  return (
    <footer className="px-5 relative isolate pt-14 pb-4">
      <div className="rounded-3xl mx-auto max-w-screen-2xl backdrop-blur-xl backdrop-saturate-150 border border-white/50 shadow-2xl inset-shadow-2xs inset-shadow-white/40 bg-linear-to-br from-violet-300/60 to-fuchsia-200/60 dark:from-violet-950/60 dark:to-fuchsia-950/60">
        <div className="flex justify-between px-10 text-foreground/70 py-10">
          <div className="flex flex-col gap-1">
            <Logo />
            <p>Every story, in one place.</p>
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map(
                ({ name, href, icon: Icon, hoverClassName }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={cn(
                      "grid size-10 place-items-center rounded-full border border-white/60 bg-white/50 transition-colors duration-200 hover:text-white",
                      hoverClassName,
                    )}
                  >
                    <Icon className="size-6" />
                  </a>
                ),
              )}
            </div>
          </div>

          <div className="flex gap-24">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-foreground">Community:</h3>
              <ul className="flex flex-col gap-2">
                {COMMUNITY_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-foreground">Support:</h3>
              <ul className="flex flex-col gap-2">
                {SUPPORT_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-foreground">
                Contact Information:
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3 items-center">
                  <Mail className="size-5" />

                  <div className="flex flex-col">
                    <p className="font-medium">Email:</p>
                    <p>support@movZ.com</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Phone className="size-5" />

                  <div className="flex flex-col">
                    <p className="font-medium">Phone:</p>
                    <p>+976 (11) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 items-center border-t border-white/40 px-10 py-5 text-sm text-foreground/70">
          <p>© 2026 MOVZ. All rights reserved.</p>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-self-center items-center gap-2 px-4 py-1.5 font-semibold text-white rounded-full bg-fuchsia-500 transition-colors hover:bg-fuchsia-600 shadow-lg shadow-fuchsia-500/50"
          >
            <SiThemoviedatabase className="size-8" />
            Powered by TMDB
          </a>
          <p className="justify-self-end">Made for movie lovers.</p>
        </div>
      </div>
    </footer>
  );
}
