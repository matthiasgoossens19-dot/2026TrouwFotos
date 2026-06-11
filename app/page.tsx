"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import Gallery from "@/components/Gallery";

export default function Home() {
  const [galleryKey, setGalleryKey] = useState(0);
  const [tab, setTab] = useState<"upload" | "gallery">("upload");

  return (
    <main className="min-h-screen bg-[#fdf8f4]">
      {/* Header */}
      <header className="text-center py-12 px-4">
        <p className="text-blush tracking-[0.3em] text-sm uppercase mb-3">Share your memories</p>
        <h1 className="text-4xl md:text-5xl text-gray-800 font-serif">Our Wedding Day</h1>
        <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
          Every photo tells a piece of our story. Upload yours and help us relive this beautiful day together.
        </p>
        <div className="mt-3 flex justify-center gap-2 text-champagne text-2xl select-none">
          <span>❀</span><span>♥</span><span>❀</span>
        </div>
      </header>

      {/* Tab switcher */}
      <div className="flex justify-center gap-3 mb-8 px-4">
        <button
          onClick={() => setTab("upload")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === "upload"
              ? "bg-rose text-white shadow"
              : "bg-white text-gray-500 border border-blush hover:bg-champagne"
          }`}
        >
          Upload Photos
        </button>
        <button
          onClick={() => setTab("gallery")}
          className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === "gallery"
              ? "bg-rose text-white shadow"
              : "bg-white text-gray-500 border border-blush hover:bg-champagne"
          }`}
        >
          View Gallery
        </button>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
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
      <footer className="text-center text-gray-400 text-xs pb-8">
        Made with ♥ for our special day
      </footer>
    </main>
  );
}
