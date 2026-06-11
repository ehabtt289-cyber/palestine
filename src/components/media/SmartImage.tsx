import { useState } from "react";
import { motion } from "framer-motion";
import { FALLBACK_IMAGE } from "@/services/media";

interface Props {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspect?: string;
}

export function SmartImage({ src, alt, className, containerClassName, aspect }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${containerClassName ?? ""}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {!loaded && <div className="absolute inset-0 skeleton-shimmer" />}
      <motion.img
        src={error ? FALLBACK_IMAGE : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={loaded ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full w-full object-cover ${className ?? ""}`}
      />
    </div>
  );
}
