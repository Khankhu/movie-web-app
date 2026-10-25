import { Mail, Phone } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Logo } from "@/components/Logo";

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebook },
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "X", href: "https://x.com", icon: FaXTwitter },
  { name: "Youtube", href: "https://youtube.com", icon: FaYoutube },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10">
      <div className="flex justify-between max-w-screen-2xl mx-auto px-5 text-zinc-400 py-10">
        <div className="flex flex-col gap-3">
          <Logo />
          <p>© 2026 MOVZ. All Rights Reserved.</p>
        </div>

        <div className="flex gap-24">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white/85">Contact Information:</h3>
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

          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white/85">Follow us:</h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="hover:text-primary transition-colors duration-200"
                >
                  <Icon className="size-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
