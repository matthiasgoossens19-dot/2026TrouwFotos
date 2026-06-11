"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { WeddingPhoto } from "@/lib/cloudinary";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [photos, setPhotos] = useState<WeddingPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function login() {
    setLoading(true);
    const res = await fetch("/api/photos");
    const data = await res.json();
    if (!Array.isArray(data)) {
      setError("Wrong password or failed to load.");
      setLoading(false);
      return;
    }
    // Verify password works against delete endpoint with a dummy call
    const check = await fetch("/api/admin/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, public_id: "__check__" }),
    });
    if (check.status === 401) {
      setError("Ongeldig wachtwoord.");
      setLoading(false);
      return;
    }
    setPhotos(data);
    setAuthed(true);
    setLoading(false);
  }

  async function loadPhotos() {
    const res = await fetch("/api/photos");
    const data = await res.json();
    if (Array.isArray(data)) setPhotos(data);
  }

  async function deletePhoto(public_id: string) {
    if (!confirm("Ben je zeker dat je deze foto wil verwijderen?")) return;
    setDeleting(public_id);
    await fetch("/api/admin/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, public_id }),
    });
    setDeleting(null);
    await loadPhotos();
  }

  useEffect(() => {
    if (authed) loadPhotos();
  }, [authed]);

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#faf6f0] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-[#ede4d6] p-10 w-full max-w-sm text-center shadow-sm">
          <p className="font-script text-3xl text-[#b89b72] mb-2">Admin</p>
          <p className="text-[#7a6650] text-sm mb-6">Anneleen & Matthias — Foto beheer</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Wachtwoord"
            className="w-full border border-[#e0d4c0] rounded-xl px-4 py-3 text-sm text-[#5c4a32] focus:outline-none focus:ring-2 focus:ring-[#b89b72] bg-[#faf6f0] mb-3"
          />
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-[#b89b72] text-white py-3 rounded-xl text-sm hover:bg-[#a08660] disabled:opacity-40 transition-colors"
          >
            {loading ? "Laden…" : "Inloggen"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf6f0] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-script text-4xl text-[#b89b72]">Foto beheer</p>
          <p className="text-[#7a6650] text-sm mt-1">{photos.length} foto&apos;s in de galerij</p>
        </div>

        {photos.length === 0 ? (
          <p className="text-center text-[#b89b72] text-sm">Geen foto&apos;s gevonden.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo) => {
              const name = photo.context?.custom?.uploader_name ?? "Anoniem";
              return (
                <div key={photo.public_id} className="relative group rounded-xl overflow-hidden shadow-sm border border-[#ede4d6] bg-white">
                  <Image
                    src={photo.secure_url}
                    alt={`Foto door ${name}`}
                    width={300}
                    height={300}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2">
                    <p className="text-xs text-[#7a6650] truncate">{name}</p>
                  </div>
                  <button
                    onClick={() => deletePhoto(photo.public_id)}
                    disabled={deleting === photo.public_id}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    title="Verwijderen"
                  >
                    {deleting === photo.public_id ? "…" : "✕"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
