import { useTranslation } from "react-i18next";
import { Triangle, Github, Heart } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-24 border-t border-border/50 glass">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-8">
        <div className="flex items-center gap-2">
          <Triangle className="h-4 w-4 rotate-90 text-accent" />
          <span className="text-gradient-gold font-display">
            {t("meta.siteName")}
          </span>
        </div>
        <p className="text-center text-xs">{t("footer.rights")}</p>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-blood" /> Free & Open
          </span>
        </div>
      </div>
    </footer>
  );
}
