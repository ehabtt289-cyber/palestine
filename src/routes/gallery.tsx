import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, X, ExternalLink } from "lucide-react";
import { PageTransition, SectionHeading } from "@/components/motion/Primitives";
import { useWikimediaImages } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";
import type { MediaImage } from "@/services/media";

const FILTERS = [
  { key: "all", q: "Palestine" },
  { key: "jerusalem", q: "Jerusalem old city" },
  { key: "nakba", q: "1948 Palestine" },
  { key: "culture", q: "Palestinian culture" },
  { key: "art", q: "Palestinian art" },
  { key: "landscape", q: "Palestine landscape" },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Palestine" },
      { name: "description", content: "Photographs from Wikimedia Commons and open archives." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<MediaImage | null>(null);

  const query = useMemo(() => {
    if (search.trim()) return `Palestine ${search.trim()}`;
    return FILTERS.find((f) => f.key === filter)?.q ?? "Palestine";
  }, [filter, search]);

  const { data, loading } = useWikimediaImages(query, 40);

  return (
    <PageTransition>
      <SectionHeading eyebrow="Archive" title={t("gallery.title")} subtitle={t("gallery.subtitle")} />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("gallery.search")}
            className="w-full rounded-full glass py-2.5 ps-10 pe-4 text-sm outline-none focus:ring-2 focus:ring-accent/60"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => {
                setFilter(f.key);
                setSearch("");
              }}
              className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-wider transition ${
                filter === f.key && !search
                  ? "bg-accent text-accent-foreground"
                  : "glass hover-lift"
              }`}
            >
              {f.key === "all" ? t("gallery.all") : f.key}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="mb-3 break-inside-avoid rounded-xl skeleton-shimmer" style={{ height: 200 + ((i * 37) % 160) }} />
          ))}
        </div>
      )}

      {!loading && data.length === 0 && (
        <p className="py-16 text-center text-muted-foreground">{t("gallery.empty")}</p>
      )}

      <motion.div layout className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {data.map((img, i) => (
          <motion.button
            key={img.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.6) }}
            onClick={() => setActive(img)}
            className="mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl glass shadow-cinema hover-lift"
          >
            <SmartImage src={img.thumb} alt={img.title} className="transition-transform duration-700 hover:scale-110" />
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-background/90 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl glass-strong shadow-cinema"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute end-3 top-3 z-10 rounded-full glass p-2"
              >
                <X className="h-4 w-4" />
              </button>
              <img src={active.url} alt={active.title} className="max-h-[70vh] w-full object-contain" />
              <div className="p-5">
                <h3 className="font-display text-lg">{active.title}</h3>
                {active.description && (
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{active.description}</p>
                )}
                <a
                  href={active.sourceUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline"
                >
                  {t("gallery.source")}: {active.source} <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
