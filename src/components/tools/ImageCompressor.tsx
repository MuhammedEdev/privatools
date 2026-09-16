"use client";

import { useState, ChangeEvent } from "react";
import { Upload, Download, Image as ImageIcon, Sliders } from "lucide-react";

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<string>("");
  const [compressedSize, setCompressedSize] = useState<string>("");
  const [quality, setQuality] = useState<number>(80);
  const [fileName, setFileName] = useState<string>("");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setOriginalSize((file.size / 1024).toFixed(2) + " KB");

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        setOriginalImage(img.src);
        compress(img, quality / 100);
      };
    };
    reader.readAsDataURL(file);
  };

  const compress = (img: HTMLImageElement, qual: number) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", qual);
    setCompressedImage(dataUrl);

    // Boyut tahmini hesaplama
    const base64Length = dataUrl.length - (dataUrl.indexOf(",") + 1);
    const sizeInBytes = (base64Length * 3) / 4;
    setCompressedSize((sizeInBytes / 1024).toFixed(2) + " KB");
  };

  const handleQualityChange = (newQual: number) => {
    setQuality(newQual);
    if (originalImage) {
      const img = new window.Image();
      img.src = originalImage;
      img.onload = () => compress(img, newQual / 100);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Image Compressor</h1>
        <p className="text-sm text-slate-400 mt-1">
          Görsellerinizi tarayıcınızda güvenle sıkıştırın, kaliteyi optimize edin ve anında indirin.
        </p>
      </div>

      <div className="border border-slate-800 hover:border-slate-700 bg-[#090D16] rounded-lg p-6 flex flex-col items-center justify-center min-h-[140px] relative transition cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <Upload className="w-8 h-8 text-slate-500 mb-2" />
        <p className="text-sm font-medium text-slate-300">
          {fileName ? fileName : "Görsel yüklemek için tıklayın veya sürükleyin"}
        </p>
        <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP desteklenir</p>
      </div>

      {originalImage && (
        <div className="space-y-4">
          <div className="bg-[#090D16] border border-slate-800 rounded-lg p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center text-slate-400 font-medium">
              <span>Sıkıştırma Kalitesi: {quality}%</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-2 text-xs">
              <span className="text-slate-400 font-medium block">Orijinal Boyut: {originalSize}</span>
              <div className="w-full h-40 bg-slate-900/50 rounded flex items-center justify-center overflow-hidden border border-slate-800">
                <img src={originalImage} alt="Orijinal" className="max-h-full object-contain" />
              </div>
            </div>

            <div className="bg-[#090D16] border border-slate-800 rounded-lg p-4 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">Sıkıştırılmış: {compressedSize}</span>
                {compressedImage && (
                  <a
                    href={compressedImage}
                    download={`optimized-${fileName || "image.jpg"}`}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-2.5 py-1 rounded transition flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" /> İndir
                  </a>
                )}
              </div>
              <div className="w-full h-40 bg-slate-900/50 rounded flex items-center justify-center overflow-hidden border border-slate-800">
                {compressedImage && <img src={compressedImage} alt="Sıkıştırılmış" className="max-h-full object-contain" />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}