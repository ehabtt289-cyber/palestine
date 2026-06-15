import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

// Nakba: 15 May 1948
const NAKBA = new Date("1948-05-15T00:00:00Z").getTime();

function useLiveDiff() {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, now - NAKBA);
  const sec = Math.floor(ms / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  const years = +(days / 365.25).toFixed(2);
  return { days, hours, minutes, seconds, years };
}

export function OccupationCounter() {
  const { t } = useTranslation();
  const d = useLiveDiff();
  const cells = [
    { label: t("counter.years"), value: d.years.toFixed(2) },
    { label: t("counter.days"), value: d.days.toLocaleString() },
    { label: t("counter.hours"), value: String(d.hours).padStart(2, "0") },
    { label: t("counter.minutes"), value: String(d.minutes).padStart(2, "0") },
    { label: t("counter.seconds"), value: String(d.seconds).padStart(2, "0") },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-strong relative overflow-hidden rounded-3xl p-6 text-center shadow-cinema md:p-10"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.55_0.22_25/0.18),transparent_70%)]" />
      <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-accent">
        <Clock className="h-3 w-3" /> {t("counter.eyebrow")}
      </div>
      <h3 className="font-display text-2xl font-semibold text-gradient-flag md:text-4xl">
        {t("counter.title")}
      </h3>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">{t("counter.sub")}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {cells.map((c) => (
          <div key={c.label} className="rounded-2xl bg-background/40 p-3 ring-1 ring-border">
            <div className="font-display text-xl font-bold tabular-nums text-gradient-gold md:text-3xl">
              {c.value}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
