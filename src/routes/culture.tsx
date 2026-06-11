import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import culture from "@/data/culture.json";
import { PageTransition, SectionHeading, Reveal, fadeUp, stagger } from "@/components/motion/Primitives";
import { useLang, pick } from "@/hooks/useLang";
import { useFirstImage } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";

export const Route = createFileRoute("/culture")({
  head: () => ({
    meta: [
      { title: "Culture & Heritage — Palestine" },
      { name: "description", content: "Food, dress, embroidery, dance and heritage sites." },
    ],
  }),
  component: CulturePage,
});

const SECTIONS: { key: keyof typeof culture; tKey: string }[] = [
  { key: "food", tKey: "culture.food" },
  { key: "clothing", tKey: "culture.clothing" },
  { key: "tatreez", tKey: "culture.tatreez" },
  { key: "dabke", tKey: "culture.dabke" },
  { key: "heritage", tKey: "culture.heritage" },
];

function CulturePage() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <PageTransition>
      <SectionHeading eyebrow="Heritage" title={t("culture.title")} subtitle={t("culture.subtitle")} />

      <div className="space-y-16">
        {SECTIONS.map((sec) => {
          const items = culture[sec.key] as any[];
          return (
            <section key={sec.key}>
              <Reveal>
                <h3 className="mb-6 font-display text-2xl text-gradient-gold">
                  {t(sec.tKey)}
                </h3>
              </Reveal>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              >
                {items.map((item) => (
                  <CultureCard key={item.id} item={item} lang={lang} />
                ))}
              </motion.div>
            </section>
          );
        })}
      </div>
    </PageTransition>
  );
}

function CultureCard({ item, lang }: any) {
  const img = useFirstImage(item.query);
  return (
    <motion.article variants={fadeUp} className="group overflow-hidden rounded-2xl glass shadow-cinema hover-lift">
      <SmartImage src={img} alt={pick(item.name, lang)} aspect="4/3" className="transition-transform duration-700 group-hover:scale-110" />
      <div className="p-5">
        <h4 className="font-display text-lg">{pick(item.name, lang)}</h4>
        <p className="mt-2 text-sm text-muted-foreground">{pick(item.desc, lang)}</p>
      </div>
    </motion.article>
  );
}
