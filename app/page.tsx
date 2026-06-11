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
      <header className="relative flex flex-col items-center text-center px-6 pt-14 pb-0 overflow-hidden">

        {/* Decorative top line */}
        <p className="text-[#b89b72] tracking-[0.35em] text-xs uppercase mb-5 font-sans font-light">
          20 juni 2026
        </p>

        {/* Names */}
        <h1 className="font-script text-6xl md:text-7xl text-[#5c4a32] leading-tight">
          Anneleen & Matthias
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="h-px w-16 bg-[#b89b72]" />
          <span className="text-[#b89b72] text-lg">♥</span>
          <div className="h-px w-16 bg-[#b89b72]" />
        </div>

        {/* Tagline */}
        <p className="text-[#7a6650] text-sm font-light max-w-xs leading-relaxed">
          Deel jouw foto&apos;s van onze trouwdag.<br />
          Elk beeld vertelt een stukje van ons verhaal.
        </p>

        {/* Venue illustration */}
        <div className="mt-8 w-full max-w-lg mx-auto">
          <Image
            src="/venue.png"
            alt="Trouwlocatie Anneleen & Matthias"
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </header>

      {/* Tab switcher */}
      <div className="flex justify-center gap-3 mt-8 mb-8 px-4">
        <button
          onClick={() => setTab("upload")}
          className={`px-7 py-2.5 rounded-full text-sm transition-all border ${
            tab === "upload"
              ? "bg-[#b89b72] text-white border-[#b89b72] shadow-sm"
              : "bg-white text-[#7a6650] border-[#d6c4a8] hover:bg-[#f3ece0]"
          }`}
        >
          Foto&apos;s uploaden
        </button>
        <button
          onClick={() => setTab("gallery")}
          className={`px-7 py-2.5 rounded-full text-sm transition-all border ${
            tab === "gallery"
              ? "bg-[#b89b72] text-white border-[#b89b72] shadow-sm"
              : "bg-white text-[#7a6650] border-[#d6c4a8] hover:bg-[#f3ece0]"
          }`}
        >
          Galerij bekijken
        </button>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
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
      <footer className="text-center text-[#b89b72] text-xs pb-10 font-script text-lg">
        Anneleen & Matthias — 20.06.2026
      </footer>

    </main>
  );
}
