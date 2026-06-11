import { useTranslation } from "react-i18next";

export type Lang = "ar" | "en" | "fr";
export type Localized<T = string> = Record<Lang, T>;

export function useLang(): Lang {
  const { i18n } = useTranslation();
  const code = (i18n.language || "ar").split("-")[0];
  return (["ar", "en", "fr"].includes(code) ? code : "ar") as Lang;
}

export function pick<T>(value: Localized<T> | T, lang: Lang): T {
  if (value && typeof value === "object" && (value as any)[lang] !== undefined) {
    return (value as Localized<T>)[lang];
  }
  return value as T;
}
