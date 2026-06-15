import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Quote, RefreshCw } from "lucide-react";
import { useLang, pick, type Localized } from "@/hooks/useLang";

type Q = { text: Localized; author: Localized };

const QUOTES: Q[] = [
  {
    text: {
      ar: "على هذه الأرض ما يستحق الحياة.",
      en: "On this earth, there is that which deserves life.",
      fr: "Sur cette terre, il y a ce qui mérite la vie.",
    },
    author: { ar: "محمود درويش", en: "Mahmoud Darwish", fr: "Mahmoud Darwich" },
  },
  {
    text: {
      ar: "إن لم تكن مع الحق فأنت مع الباطل.",
      en: "If you are not with truth, you stand with falsehood.",
      fr: "Si vous n'êtes pas avec la vérité, vous êtes avec le mensonge.",
    },
    author: { ar: "غسان كنفاني", en: "Ghassan Kanafani", fr: "Ghassan Kanafani" },
  },
  {
    text: {
      ar: "أناديكم… أشدّ على أياديكم.",
      en: "I call upon you… I clasp your hands.",
      fr: "Je vous appelle… je serre vos mains.",
    },
    author: { ar: "توفيق زياد", en: "Tawfiq Zayyad", fr: "Tawfiq Zayyad" },
  },
  {
    text: {
      ar: "وطني ليس حقيبة، وأنا لست مسافراً.",
      en: "My homeland is not a suitcase, and I am not a traveler.",
      fr: "Ma patrie n'est pas une valise, et je ne suis pas un voyageur.",
    },
    author: { ar: "محمود درويش", en: "Mahmoud Darwish", fr: "Mahmoud Darwich" },
  },
  {
    text: {
      ar: "نحن شعب لا يموت.",
      en: "We are a people who do not die.",
      fr: "Nous sommes un peuple qui ne meurt pas.",
    },
    author: { ar: "فدوى طوقان", en: "Fadwa Tuqan", fr: "Fadwa Touqan" },
  },
  {
    text: {
      ar: "القدس عاصمتنا الأبدية.",
      en: "Jerusalem is our eternal capital.",
      fr: "Jérusalem est notre capitale éternelle.",
    },
    author: { ar: "ياسر عرفات", en: "Yasser Arafat", fr: "Yasser Arafat" },
  },
  {
    text: {
      ar: "العين بصيرة واليد قصيرة.",
      en: "The eye sees, but the hand cannot reach.",
      fr: "L'œil voit, mais la main ne peut atteindre.",
    },
    author: { ar: "مثل فلسطيني", en: "Palestinian proverb", fr: "Proverbe palestinien" },
  },
];

function todayIndex(len: number) {
  const d = new Date();
  const seed = d.getFullYear() * 1000 + (d.getMonth() + 1) * 31 + d.getDate();
  return seed % len;
}

export function DailyQuote() {
  const { t } = useTranslation();
  const lang = useLang();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(todayIndex(QUOTES.length));
  }, []);

  const q = QUOTES[idx];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass relative overflow-hidden rounded-3xl p-6 shadow-cinema md:p-10"
    >
      <Quote className="absolute -start-2 -top-2 h-24 w-24 text-accent/10" />
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-background/40 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-accent">
          {t("quote.eyebrow")}
        </span>
        <button
          aria-label="next quote"
          onClick={() => setIdx((i) => (i + 1) % QUOTES.length)}
          className="rounded-full glass p-2 transition-transform hover:rotate-180"
        >
          <RefreshCw className="h-4 w-4 text-accent" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.blockquote
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <p className="font-display text-2xl leading-relaxed text-foreground/95 md:text-3xl">
            “{pick(q.text, lang)}”
          </p>
          <footer className="mt-4 text-sm uppercase tracking-[0.25em] text-gradient-gold">
            — {pick(q.author, lang)}
          </footer>
        </motion.blockquote>
      </AnimatePresence>
    </motion.div>
  );
}
