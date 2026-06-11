// Free public APIs only — Wikimedia Commons + Wikipedia
export interface MediaImage {
  id: string;
  title: string;
  url: string;
  thumb: string;
  source: string;
  sourceUrl: string;
  description?: string;
}

const cache = new Map<string, { ts: number; data: MediaImage[] }>();
const TTL = 1000 * 60 * 30;

const FALLBACK =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Flag_of_Palestine.svg/800px-Flag_of_Palestine.svg.png";

export async function searchWikimediaImages(
  query: string,
  limit = 12,
): Promise<MediaImage[]> {
  const key = `${query}::${limit}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.ts < TTL) return hit.data;

  try {
    const url = new URL("https://commons.wikimedia.org/w/api.php");
    url.search = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrnamespace: "6",
      gsrsearch: `${query} filetype:bitmap|drawing -fileres:0`,
      gsrlimit: String(limit),
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      iiurlwidth: "800",
      format: "json",
      origin: "*",
    }).toString();

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("wikimedia error");
    const json = await res.json();
    const pages = json?.query?.pages ?? {};

    const data: MediaImage[] = Object.values<any>(pages)
      .filter((p) => p?.imageinfo?.[0]?.thumburl)
      .map((p) => {
        const info = p.imageinfo[0];
        const meta = info.extmetadata ?? {};
        return {
          id: String(p.pageid),
          title: (p.title || "").replace(/^File:/, "").replace(/\.[^.]+$/, ""),
          url: info.url,
          thumb: info.thumburl,
          source: "Wikimedia Commons",
          sourceUrl: `https://commons.wikimedia.org/?curid=${p.pageid}`,
          description: meta?.ImageDescription?.value
            ? String(meta.ImageDescription.value).replace(/<[^>]+>/g, "")
            : undefined,
        };
      });

    cache.set(key, { ts: Date.now(), data });
    return data;
  } catch (e) {
    console.warn("Wikimedia fetch failed", e);
    return [];
  }
}

export async function getFirstImage(query: string): Promise<string> {
  const imgs = await searchWikimediaImages(query, 1);
  return imgs[0]?.thumb || FALLBACK;
}

export { FALLBACK as FALLBACK_IMAGE };
