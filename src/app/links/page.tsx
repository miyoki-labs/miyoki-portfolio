import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";
import LinkTree from "@/components/LinkTree";

export const metadata: Metadata = {
  title: "リンク集",
  description: `${site.name}（${site.role}）の各媒体まとめ。${site.handle} で全媒体つながっています。`,
};

export default function LinksPage() {
  return (
    <main className="page-space mx-auto max-w-md px-5">
      <div className="text-center">
        <Image
          src="/logo-avatar.webp"
          alt={`${site.name} ロゴ`}
          width={72}
          height={72}
          priority
          className="mx-auto h-18 w-18 rounded-full"
        />
        <h1 className="display-md heading-wrap mt-4 font-display">{site.name}</h1>
        <p className="mt-1 font-mono text-xs text-brand-accent">{site.role}</p>
        <p className="mt-4 text-[15px] text-g3">
          各媒体はこちらで検索 →{" "}
          <span className="font-mono font-semibold text-brand-accent">{site.handle}</span>
        </p>
      </div>

      <div className="mt-8">
        <LinkTree />
      </div>
    </main>
  );
}
