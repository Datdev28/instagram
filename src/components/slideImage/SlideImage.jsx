import React, { memo } from "react";

const SlideImage = ({ selectedFile, picked, setPicked }) => {
  const handleLeft = () => {
    setPicked((prev) =>
      prev === 0 ? selectedFile.length - 1 : prev - 1
    );
  };

  const handleRight = () => {
    setPicked((prev) =>
      prev === selectedFile.length - 1 ? 0 : prev + 1
    );
  };

  if (!selectedFile || selectedFile.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Không có ảnh</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex relative">
      <div className="flex items-center w-full h-full overflow-hidden">
        <img
          src={selectedFile[picked]}
          className="w-full h-[38rem] object-cover"
          alt={`hình ảnh ${picked + 1}`}
        />
      </div>

      {selectedFile.length > 1 && (
        <>
          <button
            className="w-8 h-8 bg-black cursor-pointer opacity-80 hover:opacity-100 left-2 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl absolute top-1/2 transform -translate-y-1/2"
            onClick={handleLeft}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            className="w-8 h-8 bg-black cursor-pointer opacity-80 hover:opacity-100 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={handleRight}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {selectedFile.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {selectedFile.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 cursor-pointer rounded-full border border-white ${
                index === picked ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => setPicked(picked)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(SlideImage);
