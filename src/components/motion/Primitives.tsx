import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function PageTransition({ children }: PropsWithChildren) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8"
    >
      {children}
    </motion.main>
  );
}

export function Reveal({ children, delay = 0, className }: PropsWithChildren<{ delay?: number; className?: string }>) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-10 text-center">
      {eyebrow && (
        <div className="mb-3 inline-block rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-gradient-flag md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
