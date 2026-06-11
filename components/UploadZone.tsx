"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UploadZoneProps {
  onUploadSuccess: () => void;
}

export default function UploadZone({ onUploadSuccess }: UploadZoneProps) {
  const [name, setName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted]);
    setDone(false);
    setError("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const handleUpload = async () => {
    if (!name.trim()) { setError("Vul jouw naam in."); return; }
    if (files.length === 0) { setError("Selecteer minstens één foto."); return; }

    setUploading(true);
    setProgress(0);
    setError("");

    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append("file", files[i]);
      fd.append("name", name.trim());
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) { setError("Upload mislukt. Probeer opnieuw."); setUploading(false); return; }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setUploading(false);
    setDone(true);
    setFiles([]);
    onUploadSuccess();
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-[#ede4d6] p-8 space-y-6">

      {/* Name field */}
      <div>
        <label className="block text-xs text-[#b89b72] mb-2 tracking-widest uppercase">
          Jouw naam
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="bv. Sarah & Tom"
          className="w-full border border-[#e0d4c0] rounded-xl px-4 py-3 text-[#5c4a32] text-sm focus:outline-none focus:ring-2 focus:ring-[#b89b72] bg-[#faf6f0] placeholder-[#c4b49a]"
        />
      </div>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-[#b89b72] bg-[#f3ece0]"
            : "border-[#ddd0bb] bg-[#fdf9f4] hover:bg-[#f3ece0] hover:border-[#b89b72]"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-3xl mb-3">📷</p>
        <p className="text-[#7a6650] text-sm">
          {isDragActive ? "Laat je foto&apos;s los…" : "Sleep je foto's hierheen, of klik om te bladeren"}
        </p>
        <p className="text-[#c4b49a] text-xs mt-2">JPG · PNG · HEIC · WEBP</p>
      </div>

      {/* Selected files */}
      {files.length > 0 && (
        <ul className="text-xs text-[#7a6650] space-y-1.5 max-h-32 overflow-y-auto">
          {files.map((f, i) => (
            <li key={i} className="flex justify-between items-center bg-[#faf6f0] rounded-lg px-3 py-1.5">
              <span className="truncate">{f.name}</span>
              <button
                onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                className="ml-2 text-[#c4b49a] hover:text-[#b89b72] text-sm"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Error */}
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      {/* Progress bar */}
      {uploading && (
        <div className="w-full bg-[#ede4d6] rounded-full h-1.5">
          <div
            className="bg-[#b89b72] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Success */}
      {done && (
        <p className="text-[#8a9e8a] text-sm font-semibold text-center">
          ✨ Merci! Jouw foto&apos;s zijn gedeeld.
        </p>
      )}

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="w-full bg-[#b89b72] text-white py-3 rounded-xl text-sm tracking-wide hover:bg-[#a08660] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {uploading
          ? `Bezig met uploaden… ${progress}%`
          : files.length > 0
          ? `Deel ${files.length} foto${files.length !== 1 ? "'s" : ""}`
          : "Deel jouw foto's"}
      </button>
    </div>
  );
}
