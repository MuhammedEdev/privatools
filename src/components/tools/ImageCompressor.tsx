"use client";

import { useState, ChangeEvent } from "react";
import { Download, Upload, Image as ImageIcon, Sliders } from "lucide-react";

export default function ImageCompressor() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageSrc(result);
      compressImage(result, quality);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (src: string, qual: number) => {
    setLoading(true);
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", qual / 100);
      setCompressedUrl(dataUrl);

      // Yaklaşık sıkıştırılmış boyut hesaplama
      const base64Length = dataUrl.split(",")[1].length;
      const computedSize = Math.round((base64Length * 3) / 4);
      setCompressedSize(computedSize);
      setLoading(false);
    };
  };

  const handleQualityChange = (newQual: number) => {
    setQuality(newQual);
    if (imageSrc) {
      compressImage(imageSrc, newQual);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Pro Image Compressor</h1>
          <p className="text-sm text-slate-400 mt-1">
            Görsellerinizi kaliteden ödün vermeden tarayıcı tarafında sıkıştırın ve optimize edin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border border-slate-800 hover:border-slate-700 bg-[#090D16] rounded-lg p-8 flex flex-col items-center justify-center min-h-[220px] relative transition cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <Upload className="w-10 h-10 text-slate-500 mb-2 group-hover:text-emerald-400 transition" />
            <p className="text-sm font-medium text-slate-300">Görsel seçmek için tıklayın veya sürükleyin</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP desteklenir</p>
          </div>

          {imageSrc && (
            <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-3 text-xs">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Kalite Ayarı</span>
                <span className="font-mono text-white">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="bg-[#090D16] border border-slate-800 rounded-lg p-6 flex flex-col justify-between">
          {imageSrc && compressedUrl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center bg-[#0D121F] border border-slate-800 rounded-lg p-3 h-40">
                <img src={compressedUrl} alt="Compressed" className="max-h-full rounded object-contain" />
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between bg-[#0D121F] border border-slate-800 rounded p-2.5">
                  <span className="text-slate-400">Orijinal Boyut:</span>
                  <span className="text-white font-semibold">{formatBytes(fileSize)}</span>
                </div>
                <div className="flex justify-between bg-[#0D121F] border border-slate-800 rounded p-2.5">
                  <span className="text-slate-400">Sıkıştırılmış Boyut:</span>
                  <span className="text-emerald-400 font-semibold">{formatBytes(compressedSize)}</span>
                </div>
              </div>

              <a
                href={compressedUrl}
                download={`compressed-${fileName || "image.jpg"}`}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs py-2.5 px-4 rounded-lg transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" /> Optimize Edilmiş Görseli İndir
              </a>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs py-12">
              <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
              <span>Görsel önizlemesi ve optimizasyon sonuçları burada görünecek</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}