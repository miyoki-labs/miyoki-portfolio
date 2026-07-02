"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// .fade-in を付けた要素が画面に入ったら .is-visible を付与してアニメーションさせる。
// pathname が変わるたびに再監視する（SPA遷移後の新しい要素が opacity:0 のまま
// 残らないようにする）。
export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".fade-in:not(.is-visible)");
    const win = window as Window & { __nbReveal?: boolean };

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      win.__nbReveal = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    win.__nbReveal = true;

    // ビューポート内の未表示 .fade-in を一括で出すスイープ。
    // 全部出きったらスクロール監視も解除する。
    const revealInView = () => {
      document
        .querySelectorAll<HTMLElement>(".fade-in:not(.is-visible)")
        .forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("is-visible");
          }
        });
      if (document.querySelectorAll(".fade-in:not(.is-visible)").length === 0) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    // 遷移直後に IntersectionObserver が発火しないケースの保険。
    const failsafe = window.setTimeout(revealInView, 300);

    // 高速スクロール等で Observer が取りこぼしても、スクロール/リサイズで確実に出す（rAFで間引き）。
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        revealInView();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return null;
}
