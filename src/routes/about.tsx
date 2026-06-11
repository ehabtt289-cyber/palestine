import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageTransition, SectionHeading, Reveal } from "@/components/motion/Primitives";
import { useFirstImage } from "@/hooks/useWikimedia";
import { SmartImage } from "@/components/media/SmartImage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Palestine" },
      { name: "description", content: "About Palestine and this documentary project." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  const img = useFirstImage("Palestine olive tree");

  return (
    <PageTransition>
      <SectionHeading eyebrow="About" title={t("about.title")} subtitle={t("about.subtitle")} />
      <div className="grid gap-8 md:grid-cols-2">
        <Reveal>
          <div className="glass shadow-cinema overflow-hidden rounded-3xl">
            <SmartImage src={img} alt="Palestine" aspect="4/5" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass shadow-cinema h-full rounded-3xl p-8">
            <h3 className="font-display text-2xl text-gradient-gold">{t("about.project")}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("about.projectText")}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>• Wikimedia Commons</li>
              <li>• Wikipedia</li>
              <li>• Internet Archive</li>
              <li>• Europeana</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}
