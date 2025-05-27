const useUpAndGetImage = () => {
  const handleImageUpload = async (files) => {
    const uploadedUrls = [];
    if (!files || files.length === 0) return uploadedUrls;
    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "avatar_upload_preset");
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/druurg3gg/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      } catch (error) {
        console.error(error);
      }
    }
    return uploadedUrls;
  };
  return {
    handleImageUpload,
  };
};

export default useUpAndGetImage;
