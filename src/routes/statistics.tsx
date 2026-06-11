import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  Area, AreaChart, PieChart, Pie, Cell, Legend,
} from "recharts";
import stats from "@/data/statistics.json";
import { PageTransition, SectionHeading, Reveal } from "@/components/motion/Primitives";
import { useLang } from "@/hooks/useLang";

const COLORS = ["oklch(0.62 0.18 145)", "oklch(0.78 0.14 75)", "oklch(0.55 0.22 25)", "oklch(0.55 0.05 220)"];

export const Route = createFileRoute("/statistics")({
  head: () => ({
    meta: [
      { title: "Statistics — Palestine" },
      { name: "description", content: "Population, refugees and land-use visualised." },
    ],
  }),
  component: StatsPage,
});

function StatsPage() {
  const { t } = useTranslation();
  const lang = useLang();

  const population = stats.population.map((p) => ({
    name: lang === "ar" ? p.regionAr : lang === "fr" ? p.regionFr : p.region,
    value: p.value,
  }));
  const landUse = stats.landUse.map((l) => ({
    name: lang === "ar" ? l.nameAr : lang === "fr" ? l.nameFr : l.name,
    value: l.value,
  }));

  return (
    <PageTransition>
      <SectionHeading eyebrow="Data" title={t("stats.title")} subtitle={t("stats.subtitle")} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <ChartCard title={t("stats.population")}>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={population}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
                <XAxis dataKey="name" stroke="oklch(0.7 0 0)" tick={{ fontSize: 11 }} />
                <YAxis stroke="oklch(0.7 0 0)" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.02 160)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Bar dataKey="value" fill="url(#popGrad)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="popGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.14 75)" />
                    <stop offset="100%" stopColor="oklch(0.62 0.18 145)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>

        <Reveal delay={0.1}>
          <ChartCard title={t("stats.refugees")}>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={stats.refugees}>
                <defs>
                  <linearGradient id="ref" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.14 75)" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="oklch(0.62 0.18 145)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.08)" />
                <XAxis dataKey="year" stroke="oklch(0.7 0 0)" tick={{ fontSize: 11 }} />
                <YAxis stroke="oklch(0.7 0 0)" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.02 160)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke="oklch(0.78 0.14 75)" fill="url(#ref)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-2">
          <ChartCard title={t("stats.landUse")}>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={landUse} dataKey="value" nameKey="name" innerRadius={60} outerRadius={120} paddingAngle={4}>
                  {landUse.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.02 160)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Reveal>
      </div>
    </PageTransition>
  );
}

function ChartCard({ title, children }: any) {
  return (
    <div className="glass shadow-cinema rounded-2xl p-5">
      <h3 className="mb-4 font-display text-lg">{title}</h3>
      {children}
    </div>
  );
}
