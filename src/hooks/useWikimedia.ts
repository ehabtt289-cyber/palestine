import { useEffect, useState } from "react";
import { searchWikimediaImages, type MediaImage, FALLBACK_IMAGE } from "@/services/media";
import { getStaticImage, getStaticImages } from "@/data/staticImages";

export function useWikimediaImages(query: string, limit = 12) {
  // Seed synchronously with curated static URLs so images appear instantly.
  const seeded: MediaImage[] = getStaticImages(query).map((url, i) => ({
    id: `static-${query}-${i}`,
    title: query,
    url,
    thumb: url,
    source: "Wikimedia Commons",
    sourceUrl: url,
  }));

  const [data, setData] = useState<MediaImage[]>(seeded);
  const [loading, setLoading] = useState(seeded.length === 0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // If we already have enough seeded images, skip remote fetch.
    if (seeded.length >= Math.min(limit, 6)) {
      setData(seeded);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    searchWikimediaImages(query, limit)
      .then((d) => {
        if (cancelled) return;
        // Merge seeded + remote, dedupe by url.
        const merged = [...seeded, ...d].filter(
          (x, i, a) => a.findIndex((y) => y.url === x.url) === i,
        );
        setData(merged.length ? merged : seeded);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(String(e));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, limit]);

  return { data, loading, error };
}

export function useFirstImage(query: string) {
  const initial = getStaticImage(query) ?? FALLBACK_IMAGE;
  const [src, setSrc] = useState<string>(initial);
  useEffect(() => {
    const local = getStaticImage(query);
    if (local) {
      setSrc(local);
      return;
    }
    let cancelled = false;
    searchWikimediaImages(query, 1).then((d) => {
      if (!cancelled && d[0]) setSrc(d[0].thumb);
    });
    return () => {
      cancelled = true;
    };
  }, [query]);
  return src;
}
