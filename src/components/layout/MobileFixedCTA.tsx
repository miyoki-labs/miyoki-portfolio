import Link from "next/link";
import { Mail } from "lucide-react";

// モバイルで常時表示する相談CTA。離脱前にいつでも連絡できるようにする。
// PC では非表示（md:hidden）。body 側に pb-14 を付けてフッターと被らないようにする。
export default function MobileFixedCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 backdrop-blur md:hidden">
      <Link
        href="/contact"
        className="btn-shine flex items-center justify-center gap-2 bg-brand py-3.5 font-medium text-white"
      >
        <Mail size={18} strokeWidth={2} />
        AI開発を相談する
      </Link>
    </div>
  );
}
