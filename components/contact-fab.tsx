"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildMailto } from "@/lib/contact";
import { useI18n } from "@/lib/i18n";

export function ContactFab() {
  const { t } = useI18n();

  return (
    <Button asChild className="fab-btn" aria-label={t("contact.emailLabel")}>
      <a href={buildMailto()}>
        <Mail className="icn-sm" aria-hidden="true" />
        <span>{t("hero.ctaContact")}</span>
      </a>
    </Button>
  );
}
