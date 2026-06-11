"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import type { WeddingPhoto } from "@/lib/cloudinary";

export default function Gallery() {
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [selected, setSelected] = useState<WeddingPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/photos");
    const data = await res.json();
    setPhotos(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <div className="text-center py-16 text-[#b89b72] text-sm animate-pulse">
        Foto&apos;s laden…
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-16 text-[#b89b72] text-sm">
        Nog geen foto&apos;s — wees de eerste! 🌸
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 sm:columns-3 md:columns-4 gap-3 space-y-3">
        {photos.map((photo) => {
          const uploaderName = photo.context?.custom?.uploader_name ?? "";
          return (
            <div
              key={photo.public_id}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow"
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo.secure_url}
                alt={`Photo by ${uploaderName}`}
                width={photo.width}
                height={photo.height}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />
              {uploaderName && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs truncate">{uploaderName}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-white text-3xl leading-none hover:text-champagne"
            >
              ×
            </button>
            <Image
              src={selected.secure_url}
              alt="Full size"
              width={selected.width}
              height={selected.height}
              className="max-h-[85vh] w-auto rounded-xl object-contain"
              priority
            />
            {selected.context?.custom?.uploader_name && (
              <p className="text-center text-champagne text-sm mt-3">
                Shared by {selected.context.custom.uploader_name}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
