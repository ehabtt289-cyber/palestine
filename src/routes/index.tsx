import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { ArrowRight, Play, MapPin, Sparkles } from "lucide-react";
import events from "@/data/events.json";
import stats from "@/data/statistics.json";
import { PageTransition, Reveal, SectionHeading, stagger, fadeUp } from "@/components/motion/Primitives";
import { useLang, pick, type Localized } from "@/hooks/useLang";
import { useWikimediaImages, useFirstImage } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";
import { useCountUp } from "@/hooks/useCountUp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Palestine — A Living Documentary" },
      { name: "description", content: "Discover Palestine through history, culture, places and people." },
      { property: "og:title", content: "Palestine — A Living Documentary" },
      { property: "og:description", content: "A premium multilingual digital documentary." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  const lang = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const heroBg = useFirstImage("Dome of the Rock Jerusalem");
  const featured = events.slice(2, 6);
  const { data: gallery } = useWikimediaImages("Palestine historical", 6);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative -mt-[68px] flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <SmartImage
            src={heroBg}
            alt="Palestine"
            containerClassName="absolute inset-0"
            className="scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.13_0.02_160)_85%)]" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-accent"
          >
            <Sparkles className="h-3 w-3" /> {t("meta.tagline")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-6xl font-bold leading-none text-gradient-flag md:text-[8rem]"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mx-auto mt-6 max-w-xl text-balance text-base text-foreground/85 md:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/timeline"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-background shadow-gold-glow transition-transform hover:scale-105"
            >
              {t("hero.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover-lift"
            >
              <Play className="h-4 w-4 text-accent" />
              {t("hero.secondary")}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="h-10 w-6 rounded-full border border-foreground/30 p-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-2 w-1 rounded-full bg-accent mx-auto"
            />
          </div>
        </motion.div>
      </section>

      <PageTransition>
        {/* COUNTERS */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="01"
            title={t("home.statsTitle")}
            subtitle={t("home.statsSub")}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.counters.map((c) => (
              <Counter key={(c.label as any).en} item={c as any} lang={lang} />
            ))}
          </motion.div>
        </section>

        {/* FEATURED EVENTS */}
        <section className="mb-20">
          <SectionHeading
            eyebrow="02"
            title={t("home.featuredEvents")}
            subtitle={t("home.featuredEventsSub")}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {featured.map((e) => (
              <FeaturedEventCard key={e.id} event={e} lang={lang} />
            ))}
          </motion.div>
          <div className="mt-8 text-center">
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              {t("common.readMore")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section className="mb-10">
          <SectionHeading
            eyebrow="03"
            title={t("home.featuredGallery")}
            subtitle={t("home.featuredGallerySub")}
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-3 md:grid-cols-3"
          >
            {(gallery.length ? gallery : Array.from({ length: 6 })).slice(0, 6).map((g: any, i) => (
              <motion.div
                key={g?.id ?? i}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl glass shadow-cinema"
              >
                {g ? (
                  <>
                    <SmartImage src={g.thumb} alt={g.title} aspect="4/3" className="transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-3">
                      <p className="line-clamp-1 text-xs text-foreground/90">{g.title}</p>
                      <p className="text-[10px] text-accent">{g.source}</p>
                    </div>
                  </>
                ) : (
                  <div className="aspect-[4/3] skeleton-shimmer" />
                )}
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm hover-lift"
            >
              <MapPin className="h-4 w-4 text-accent" />
              {t("nav.gallery")}
            </Link>
          </div>
        </section>
      </PageTransition>
    </>
  );
}

function Counter({ item, lang }: { item: { value: number; suffix?: string; label: Localized }; lang: any }) {
  const { ref, value } = useCountUp(item.value);
  return (
    <motion.div variants={fadeUp} className="glass hover-lift rounded-2xl p-4 text-center shadow-cinema md:p-6">
      <span
        ref={ref}
        className="block break-all font-display text-xl font-bold leading-tight text-gradient-gold sm:text-2xl md:text-4xl lg:text-5xl"
      >
        {value.toLocaleString()}
        {item.suffix ?? ""}
      </span>
      <p className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground md:text-xs">
        {pick(item.label, lang)}
      </p>
    </motion.div>
  );
}

function FeaturedEventCard({ event, lang }: any) {
  const img = useFirstImage(event.query);
  return (
    <motion.article variants={fadeUp} className="group overflow-hidden rounded-2xl glass shadow-cinema hover-lift">
      <SmartImage src={img} alt={pick(event.title, lang)} aspect="4/3" className="transition-transform duration-700 group-hover:scale-110" />
      <div className="p-5">
        <span className="text-xs uppercase tracking-[0.2em] text-accent">{event.year}</span>
        <h3 className="mt-1 font-display text-lg font-semibold">{pick(event.title, lang)}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{pick(event.description, lang)}</p>
      </div>
    </motion.article>
  );
}
