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
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (files.length === 0) { setError("Please select at least one photo."); return; }

    setUploading(true);
    setProgress(0);
    setError("");

    for (let i = 0; i < files.length; i++) {
      const fd = new FormData();
      fd.append("file", files[i]);
      fd.append("name", name.trim());
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) { setError("Upload failed. Please try again."); setUploading(false); return; }
      setProgress(Math.round(((i + 1) / files.length) * 100));
    }

    setUploading(false);
    setDone(true);
    setFiles([]);
    onUploadSuccess();
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-5">
      {/* Name field */}
      <div>
        <label className="block text-sm text-rose-700 mb-1 font-semibold tracking-wide uppercase">
          Your name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane & John"
          className="w-full border border-blush rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blush bg-white"
        />
      </div>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-rose bg-blush/20" : "border-blush bg-champagne/30 hover:bg-champagne/60"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-4xl mb-3">📷</p>
        <p className="text-gray-600 text-sm">
          {isDragActive ? "Drop your photos here…" : "Drag & drop photos here, or click to browse"}
        </p>
        <p className="text-gray-400 text-xs mt-1">JPG, PNG, HEIC, WEBP supported</p>
      </div>

      {/* Selected files list */}
      {files.length > 0 && (
        <ul className="text-sm text-gray-500 space-y-1 max-h-32 overflow-y-auto">
          {files.map((f, i) => (
            <li key={i} className="flex justify-between">
              <span className="truncate">{f.name}</span>
              <button
                onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                className="ml-2 text-rose-400 hover:text-rose-600 text-xs"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Progress */}
      {uploading && (
        <div className="w-full bg-champagne rounded-full h-2">
          <div
            className="bg-rose h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Success */}
      {done && (
        <p className="text-sage font-semibold text-center">
          ✨ Thank you! Your photos have been shared.
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className="w-full bg-rose text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {uploading ? `Uploading… ${progress}%` : `Share ${files.length > 0 ? files.length : ""} Photo${files.length !== 1 ? "s" : ""}`}
      </button>
    </div>
  );
}
