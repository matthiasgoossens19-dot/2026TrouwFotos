"use client";

import { useState } from "react";
import Image from "next/image";
import UploadZone from "@/components/UploadZone";
import Gallery from "@/components/Gallery";

export default function Home() {
  const [galleryKey, setGalleryKey] = useState(0);
  const [tab, setTab] = useState<"upload" | "gallery">("upload");

  return (
    <main className="min-h-screen bg-[#faf6f0]">

      {/* Hero */}
      <header className="flex flex-col items-center text-center px-6 pt-12">

        <p className="text-[#b89b72] tracking-[0.4em] text-xs uppercase mb-8 font-light">
          20 juni 2026
        </p>

        {/* Illustration — max width so it doesn't stretch on desktop */}
        <div className="w-full max-w-2xl mx-auto">
          <Image
            src="/venue.png"
            alt="Anneleen & Matthias"
            width={1200}
            height={576}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mt-6 mb-5">
          <div className="h-px w-20 bg-[#d6c4a8]" />
          <span className="text-[#b89b72]">♥</span>
          <div className="h-px w-20 bg-[#d6c4a8]" />
        </div>

        <p className="text-[#7a6650] text-sm font-light max-w-sm leading-relaxed mb-10">
          Deel jouw foto&apos;s van onze trouwdag.<br />
          Elk beeld vertelt een stukje van ons verhaal.
        </p>
      </header>

      {/* Tab switcher */}
      <div className="flex justify-center gap-3 mb-10 px-4">
        <button
          onClick={() => setTab("upload")}
          className={`px-8 py-2.5 rounded-full text-sm transition-all border ${
            tab === "upload"
              ? "bg-[#b89b72] text-white border-[#b89b72] shadow-sm"
              : "bg-white text-[#7a6650] border-[#d6c4a8] hover:bg-[#f3ece0]"
          }`}
        >
          Foto&apos;s uploaden
        </button>
        <button
          onClick={() => setTab("gallery")}
          className={`px-8 py-2.5 rounded-full text-sm transition-all border ${
            tab === "gallery"
              ? "bg-[#b89b72] text-white border-[#b89b72] shadow-sm"
              : "bg-white text-[#7a6650] border-[#d6c4a8] hover:bg-[#f3ece0]"
          }`}
        >
          Galerij bekijken
        </button>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        {tab === "upload" ? (
          <UploadZone
            onUploadSuccess={() => {
              setGalleryKey((k) => k + 1);
              setTimeout(() => setTab("gallery"), 1500);
            }}
          />
        ) : (
          <Gallery key={galleryKey} />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center pb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-12 bg-[#d6c4a8]" />
          <span className="text-[#b89b72] text-xs">♥</span>
          <div className="h-px w-12 bg-[#d6c4a8]" />
        </div>
        <p className="font-script text-[#b89b72] text-2xl">Anneleen & Matthias</p>
        <p className="text-[#b89b72] text-xs tracking-widest uppercase mt-1">20 · 06 · 2026</p>
      </footer>

    </main>
  );
}
