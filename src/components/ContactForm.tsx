"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

// ビルド時にインライン化。未設定なら Turnstile ウィジェットは出さない（フォームは動く）。
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Turnstile スクリプト（サイトキーがある場合のみ読み込む）
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (document.querySelector('script[src*="turnstile"]')) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    const turnstileToken = TURNSTILE_SITE_KEY
      ? String(fd.get("cf-turnstile-response") ?? "")
      : "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          turnstileToken,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "送信に失敗しました");
        setStatus("error");
        return;
      }
      setStatus("done");
      formRef.current?.reset();
    } catch {
      setError("通信エラーが発生しました。時間をおいて再度お試しください");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center">
        <p className="font-display text-lg font-semibold">送信しました。ありがとうございます。</p>
        <p className="mt-2 text-sm text-neutral-600">
          通常2〜3営業日以内にご返信します。しばらく経っても返信がない場合は、
          恐れ入りますが再度お送りください。
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">お名前 <span className="text-red-500">*</span></label>
        <input id="name" name="name" type="text" required maxLength={100} autoComplete="name" className={field} placeholder="山田 太郎" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">メールアドレス <span className="text-red-500">*</span></label>
        <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">ご相談内容 <span className="text-red-500">*</span></label>
        <textarea id="message" name="message" required maxLength={4000} rows={6} className={`${field} resize-y`} placeholder="RAG・業務自動化・AIアプリ開発など、お困りごとや実現したいことをお書きください。" />
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} />
      )}

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "送信中..." : "送信する"}
      </button>

      <p className="text-xs text-neutral-500">
        いただいた内容には通常2〜3営業日以内にご返信します。
      </p>
    </form>
  );
}
