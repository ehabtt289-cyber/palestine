import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { ar } from "./locales/ar";
import { en } from "./locales/en";
import { fr } from "./locales/fr";

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        ar: { translation: ar },
        en: { translation: en },
        fr: { translation: fr },
      },
      fallbackLng: "ar",
      supportedLngs: ["ar", "en", "fr"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
        lookupLocalStorage: "lng",
      },
    });
}

export const isRTL = (lng: string) => lng === "ar";

export function applyDir(lng: string) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lng;
  document.documentElement.dir = isRTL(lng) ? "rtl" : "ltr";
}

i18n.on("languageChanged", applyDir);

export default i18n;
