"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent, trackPageView } from "@/lib/analytics";

export default function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(`${pathname}${window.location.search}`);
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== "function") return;

      const cta = target.closest("[data-cta]");
      const position = cta?.getAttribute("data-cta") ?? undefined;
      const anchor = target.closest("a[href]");

      if (anchor) {
        const href = anchor.getAttribute("href") ?? "";
        if (href.startsWith("tel:")) {
          trackEvent("tel_click", { position });
          return;
        }
        if (/^(https?:)?\/\/(line\.me|lin\.ee)\//.test(href)) {
          trackEvent("line_click", { position });
          return;
        }
      }

      if (cta) {
        trackEvent("cta_click", {
          cta_id: position,
          cta_label: (cta.textContent ?? "").trim().slice(0, 50),
        });
      }
    }

    document.addEventListener("click", onClick, { capture: true, passive: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
