import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Triangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const langs = [
  { code: "ar", label: "العربية" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/timeline", label: t("nav.timeline") },
    { to: "/map", label: t("nav.map") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/figures", label: t("nav.figures") },
    { to: "/martyrs", label: t("nav.martyrs") },
    { to: "/statistics", label: t("nav.statistics") },
    { to: "/culture", label: t("nav.culture") },
    { to: "/cuisine", label: t("nav.cuisine") },
    { to: "/proverbs", label: t("nav.proverbs") },
    { to: "/about", label: t("nav.about") },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 glass-strong"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-gold-glow">
            <Triangle className="h-4 w-4 rotate-90 fill-background text-background" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-display font-semibold tracking-wide text-gradient-flag">
              {t("meta.siteName")}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:block">
              {t("meta.tagline")}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "text-accent" : "text-foreground/80 hover:text-accent"
                }`}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label={t("nav.language")}
                className="glass hover-lift flex items-center gap-2 rounded-md px-3 py-2 text-sm"
              >
                <Globe className="h-4 w-4 text-accent" />
                <span className="hidden sm:inline">
                  {langs.find((l) => l.code === i18n.language.split("-")[0])?.label ?? "العربية"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-strong">
              {langs.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => i18n.changeLanguage(l.code)}
                  className="cursor-pointer"
                >
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="glass rounded-md p-2 lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mx-4 mb-4 grid gap-1 rounded-xl glass p-3">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm hover:bg-accent/10"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
