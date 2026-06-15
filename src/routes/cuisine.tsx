import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChefHat } from "lucide-react";
import dishes from "@/data/cuisine.json";
import { PageTransition, SectionHeading, fadeUp, stagger } from "@/components/motion/Primitives";
import { useLang, pick } from "@/hooks/useLang";
import { useFirstImage } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";

export const Route = createFileRoute("/cuisine")({
  head: () => ({
    meta: [
      { title: "Palestinian Cuisine — Living Documentary" },
      { name: "description", content: "Traditional Palestinian dishes: musakhan, maqluba, knafeh, mansaf and more." },
      { property: "og:title", content: "Palestinian Cuisine" },
      { property: "og:description", content: "A tour of the Palestinian table." },
    ],
  }),
  component: CuisinePage,
});

function CuisinePage() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <PageTransition>
      <div className="mb-10 flex items-center justify-center gap-3 text-accent">
        <ChefHat className="h-6 w-6" />
        <span className="text-xs uppercase tracking-[0.3em]">{t("cuisine.eyebrow")}</span>
      </div>
      <SectionHeading title={t("cuisine.title")} subtitle={t("cuisine.subtitle")} />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {dishes.dishes.map((d: any) => (
          <DishCard key={d.id} dish={d} lang={lang} />
        ))}
      </motion.div>
    </PageTransition>
  );
}

function DishCard({ dish, lang }: any) {
  const img = useFirstImage(dish.query);
  return (
    <motion.article variants={fadeUp} className="group overflow-hidden rounded-2xl glass shadow-cinema hover-lift">
      <SmartImage src={img} alt={pick(dish.name, lang)} aspect="4/3" className="transition-transform duration-700 group-hover:scale-110" />
      <div className="p-5">
        <span className="text-xs uppercase tracking-[0.2em] text-accent">{pick(dish.region, lang)}</span>
        <h3 className="mt-1 font-display text-xl font-semibold text-gradient-gold">{pick(dish.name, lang)}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(dish.desc, lang)}</p>
      </div>
    </motion.article>
  );
}
