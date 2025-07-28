import { useState } from "react";
import { toast } from "react-toastify";

const useUploadAudio = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadAudio = async (audioFile) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("upload_preset", "chat_audio"); 

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/druurg3gg/video/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error(data.error?.message || "Upload thất bại");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Đã xảy ra lỗi. Hãy thử lại!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadAudio, loading, error };
};

export default useUploadAudio;
