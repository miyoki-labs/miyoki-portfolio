"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import LinkTree from "@/components/LinkTree";

const nav = [
  { href: "/works", label: "実績" },
  { href: "/about", label: "プロフィール" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [linksOpen, setLinksOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 items-center gap-2.5"
        >
          <Image
            src="/logo-avatar.webp"
            alt={`${site.name} ロゴ`}
            width={36}
            height={36}
            priority
            className="h-9 w-9 flex-shrink-0 rounded-full"
          />
          <span className="flex items-baseline gap-2 truncate">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              {site.name}
            </span>
            <span className="hidden font-mono text-[11px] text-brand-accent sm:inline">
              {site.role}
            </span>
          </span>
        </Link>

        {/* デスクトップナビ（sm以上） */}
        <nav className="hidden items-center gap-1 sm:flex sm:gap-2">
          {!isHome && (
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm text-foreground/60 hover:text-foreground"
            >
              ← トップ
            </Link>
          )}
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-foreground/70 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setLinksOpen((v) => !v)}
              aria-expanded={linksOpen}
              className="rounded-lg px-3 py-2 text-sm text-foreground/70 hover:text-foreground"
            >
              リンク集
            </button>
            {linksOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLinksOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-xl border border-black/10 bg-white p-3 shadow-lg">
                  <p className="px-1 pb-2 font-mono text-[11px] text-brand-accent">
                    各媒体はこちらで検索 → {site.handle}
                  </p>
                  <div onClick={() => setLinksOpen(false)}>
                    <LinkTree compact />
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            href="/contact"
            className="ml-1 rounded-lg bg-brand px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-light"
          >
            相談する
          </Link>
        </nav>

        {/* モバイル：メニューボタン（sm未満） */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="メニュー"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-foreground/70 hover:bg-black/5 sm:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* モバイル：展開メニュー */}
      {menuOpen && (
        <nav className="border-t border-black/5 bg-white px-5 pb-3 pt-1 sm:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-2 py-2.5 text-sm text-foreground/80 hover:bg-black/5"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/links"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg px-2 py-2.5 text-sm text-foreground/80 hover:bg-black/5"
          >
            リンク集
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 block rounded-lg bg-brand px-2 py-2.5 text-center text-sm font-medium text-white hover:bg-brand-light"
          >
            相談する
          </Link>
        </nav>
      )}
    </header>
  );
}
