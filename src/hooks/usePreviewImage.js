import { useState } from 'react'

const usePreviewImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const maxSizeFile = 2 * 1024 * 1024;
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file && file.type.startsWith("image/")){
      if(file.size > maxSizeFile){
        setSelectedFile(null);
        return
      } 
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      }
    }else {
      setSelectedFile(null);
    }
  }
  return {selectedFile, handleImageChange, setSelectedFile}
}

export default usePreviewImage
