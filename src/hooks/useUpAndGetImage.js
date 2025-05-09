const useUpAndGetImage = () => {

  const handleImageUpload = async (file) => {
    if(!file) return;
    const formData = new FormData();
    formData.append('file', file); 
    formData.append('upload_preset', 'avatar_upload_preset'); 
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/druurg3gg/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await res.json();
      return data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleImageUpload
  };
};

export default useUpAndGetImage;
