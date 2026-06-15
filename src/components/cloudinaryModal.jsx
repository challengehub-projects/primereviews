import { useState, useRef } from "react";

export default function CloudinaryModal({ onClose, onUpload }) {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  function handleFile(file) {
    if (!file) return;

    setFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function uploadImage() {
    if (!file) return;

    setLoading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "blog-image-upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhfelcnj5/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.secure_url) {
        onUpload?.(result.secure_url);   // ✅ safe call
        onClose?.();                    // ✅ SAFE FIX HERE
      } else {
        alert("Upload failed");
      }

    } catch (err) {
      console.log(err);
      alert("Upload error");
    }

    setLoading(false);
  }

  return (
    <div
      onClick={() => onClose?.()}   // ✅ safe
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#121212] border border-white/10 rounded-2xl w-[420px] p-6"
      >

        <h2 className="text-xl font-bold mb-4">
          Upload Image
        </h2>

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
          className="border border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer"
        >
          <p className="text-white/60 text-sm">
            Click or drag image here
          </p>

          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {preview && (
          <img
            src={preview}
            className="w-full h-48 object-cover rounded-xl mt-4"
          />
        )}

        <div className="flex gap-3 mt-5">

          <button
            onClick={uploadImage}
            disabled={loading || !file}
            className="flex-1 bg-white text-black py-2 rounded-xl"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={() => onClose?.()}
            className="flex-1 bg-white/10 text-white py-2 rounded-xl"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}