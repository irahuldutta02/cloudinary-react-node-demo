import { useState } from "react";
import { IoMdCopy, IoMdRemoveCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";

export const WidgetReactMultiFile = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const removeImage = (indexToRemove) => {
    setImageUrls((prevUrls) =>
      prevUrls.filter((_, index) => index !== indexToRemove)
    );
    toast.info("Image removed successfully!");
  };

  const copyImageUrl = (indexToCopy) => {
    const imageUrlToCopy = imageUrls[indexToCopy];
    navigator.clipboard.writeText(imageUrlToCopy);
    toast.info("Image URL copied to clipboard!");
  };

  return (
    <>
      <div className="flex justify-start items-center flex-col gap-4 w-full p-4">
        <h2 className="text-xl font-bold">
          Upload Widget in React Multiple File
        </h2>
      </div>
      <div className="flex justify-start items-center flex-col gap-4 w-full p-4">
        <CloudinaryUploadWidget onSetImageUrls={setImageUrls} />
        <div className="max-w-md w-full grid grid-cols-4 gap-4">
          {imageUrls.length > 0 &&
            imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center gap-2"
              >
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-auto rounded-md shadow-md"
                />
                <div className="flex justify-center items-center gap-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                    onClick={() => removeImage(index)}
                  >
                    <IoMdRemoveCircleOutline />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                    onClick={() => copyImageUrl(index)}
                  >
                    <IoMdCopy />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

function CloudinaryUploadWidget({ onSetImageUrls }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        multiple: true,
        sources: ["local", "url", "camera"],
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          onSetImageUrls((prevUrls) => [...prevUrls, result.info.secure_url]);
        }
      }
    );
  }, [onSetImageUrls]);

  return (
    <>
      <button
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
        onClick={() => widgetRef.current.open()}
      >
        Upload
      </button>
    </>
  );
}
