import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import cities from "@/data/cities.json";
import { PageTransition, SectionHeading } from "@/components/motion/Primitives";
import { useLang, pick } from "@/hooks/useLang";
import { useFirstImage } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";
import { MapPin, X } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Interactive Map — Palestine" },
      { name: "description", content: "Click any city on the map to learn its story." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const { t } = useTranslation();
  const lang = useLang();
  const [active, setActive] = useState<typeof cities[number] | null>(null);
  const img = useFirstImage(active?.query ?? "Palestine landscape");

  return (
    <PageTransition>
      <SectionHeading eyebrow="Geography" title={t("map.title")} subtitle={t("map.subtitle")} />
      <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <div className="glass shadow-cinema relative overflow-hidden rounded-3xl p-4">
          <div className="relative w-full" style={{ aspectRatio: "3/5" }}>
            {/* Stylised Palestine silhouette */}
            <svg viewBox="0 0 100 167" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.30 0.08 145)" />
                  <stop offset="100%" stopColor="oklch(0.20 0.05 160)" />
                </linearGradient>
              </defs>
              <path
                d="M40 5 L55 8 L60 18 L52 30 L58 45 L48 65 L55 90 L50 110 L42 130 L38 150 L30 160 L25 150 L28 130 L24 110 L30 90 L25 70 L30 55 L28 40 L34 25 Z"
                fill="url(#land)"
                stroke="oklch(0.78 0.14 75 / 0.5)"
                strokeWidth="0.5"
              />
            </svg>
            {cities.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                  className="absolute inset-0 -m-2 rounded-full bg-accent/30"
                />
                <span className="relative grid h-3 w-3 place-items-center rounded-full bg-accent shadow-gold-glow ring-2 ring-background" />
                <span className="absolute start-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md glass px-2 py-0.5 text-[10px] opacity-0 transition group-hover:opacity-100">
                  {pick(c.name, lang)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="glass shadow-cinema relative overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <SmartImage src={img} alt={pick(active.name, lang)} aspect="16/10" />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <h3 className="font-display text-2xl">{pick(active.name, lang)}</h3>
                    </div>
                    <button onClick={() => setActive(null)} className="rounded-full glass p-1.5">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{pick(active.info, lang)}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid h-full min-h-[300px] place-items-center p-10 text-center"
              >
                <div>
                  <MapPin className="mx-auto h-10 w-10 text-accent/60" />
                  <p className="mt-3 text-sm text-muted-foreground">{t("map.selectCity")}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
