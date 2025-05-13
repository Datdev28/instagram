import { useState, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import useAuthStore from "../../store/authStore";

const InstagramQRCode = () => {
  const ref = useRef(null);
  const [color, setColor] = useState("#000000");
  const { user } = useAuthStore();
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const newQrCode = new QRCodeStyling({
      width: 200,
      height: 200,
      data: "https://datdev28.github.io/instagram/#/" + user.userName,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
      dotsOptions: {
        color: color,
        type: "dots"
      },
      backgroundOptions: {
        color: "transparent",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
      },
      cornersSquareOptions: {
        color: color,
        type: "extra-rounded"
      },
      cornersDotOptions: {
        color: color,
        type: "dot"
      }
    });

    setQrCode(newQrCode);
    
    return () => {
      if (ref.current) {
        while (ref.current.firstChild) {
          ref.current.removeChild(ref.current.firstChild);
        }
      }
    };
  }, [color, user.userName]);

  useEffect(() => {
    if (qrCode && ref.current) {
      while (ref.current.firstChild) {
        ref.current.removeChild(ref.current.firstChild);
      }
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  const downloadQR = () => {
    if (qrCode) {
      qrCode.download({
        extension: "png",
        name: `instagram-${user.userName}`
      });
    }
  };

  const colorOptions = [
    { value: "#000000", class: "bg-black" },
    { value: "#3498db", class: "bg-blue-500" },
    { value: "#8e44ad", class: "bg-purple-600" },
    { value: "#2ecc71", class: "bg-green-500" },
    { value: "#34495e", class: "bg-gray-800" },
    { value: "#e91e63", class: "bg-pink-600" }
  ];

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
      <div className="flex flex-col md:flex-row items-center justify-center w-full h-full p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 max-w-5xl">
          <div className="bg-white p-6 rounded-xl shadow-xl w-60 h-60 flex items-center justify-center">
            <div ref={ref} className="flex items-center justify-center"></div>
          </div>
          
          <div className="text-white max-w-md">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-center">Mã QR giúp mọi người theo dõi bạn một cách nhanh chóng</h1>
            <p className="mb-4 md:mb-6 text-sm md:text-base text-center">
              Mọi người có thể xem trang cá nhân của bạn bằng cách dùng camera trên điện thoại thông minh để quét mã QR. Hãy tải mã QR của bạn xuống rồi in ra, sau đó dán mã này lên sản phẩm, áp phích, v.v.
            </p>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full ${option.class} border-2 ${
                    color === option.value ? "border-white" : "border-transparent"
                  }`}
                  onClick={() => setColor(option.value)}
                  aria-label={`Chọn màu ${option.value}`}
                />
              ))}
            </div>
            
            <button
              onClick={downloadQR}
              className="bg-white text-pink-600 font-medium py-2 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Tải mã QR xuống
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramQRCode;