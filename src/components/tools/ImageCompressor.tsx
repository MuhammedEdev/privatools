"use client";

import { useState, ChangeEvent } from "react";
import imageCompression from "browser-image-compression";
import { Upload, Download, Sliders } from "lucide-react";

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setOriginalFile(selectedFile);
    await compressImage(selectedFile, quality);
  };

  const compressImage = async (file: File, qualityValue: number) => {
    setIsProcessing(true);
    const options = {
      maxSizeMB: qualityValue,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const processed = await imageCompression(file, options);
      setCompressedFile(processed);
      setPreviewUrl(URL.createObjectURL(processed));
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Görsel Optimizasyonu</h1>
        <p className="text-sm text-slate-400 mt-1">
          Görsellerinizin kalitesini koruyarak boyutunu tarayıcınızda doğrudan düşürün.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-800 hover:border-slate-700 bg-[#090D16] rounded-lg p-6 flex flex-col items-center justify-center min-h-[220px] relative transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <Upload className="w-8 h-8 text-slate-500 mb-3" />
          <p className="text-sm font-medium text-slate-300">Dosya seçin veya sürükleyin</p>
          <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP</p>
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Kalite Limiti
              </span>
              <span>{quality} MB</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={quality}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setQuality(val);
                if (originalFile) compressImage(originalFile, val);
              }}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />

            {originalFile && compressedFile && (
              <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Orijinal:</span>
                  <span className="text-slate-200 font-mono">{(originalFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Optimize Edilen:</span>
                  <span className="text-emerald-400 font-mono font-semibold">{(compressedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            )}
          </div>

          {previewUrl && originalFile && (
            <a
              href={previewUrl}
              download={`optimized_${originalFile.name}`}
              className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2.5 px-4 rounded-md transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> İndir
            </a>
          )}
        </div>
      </div>
    </div>
  );
}