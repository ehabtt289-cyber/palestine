import { useEffect, useState } from "react";
import { searchWikimediaImages, type MediaImage, FALLBACK_IMAGE } from "@/services/media";

export function useWikimediaImages(query: string, limit = 12) {
  const [data, setData] = useState<MediaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    searchWikimediaImages(query, limit)
      .then((d) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(String(e));
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [query, limit]);

  return { data, loading, error };
}

export function useFirstImage(query: string) {
  const [src, setSrc] = useState<string>(FALLBACK_IMAGE);
  useEffect(() => {
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
