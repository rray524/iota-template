"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

interface ImageSliderProps {
  images: string[];
  category: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, category }) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const initialLoadedImages = images.reduce((acc, _, index) => {
      acc[index] = false;
      return acc;
    }, {} as { [key: number]: boolean });
    setLoadedImages(initialLoadedImages);
  }, [images]);

  const plusSlides = (n: number) => {
    let newIndex = slideIndex + n;
    if (newIndex > images.length) newIndex = 1;
    if (newIndex < 1) newIndex = images.length;
    setSlideIndex(newIndex);
  };

  const currentSlide = (n: React.SetStateAction<number>) => {
    setSlideIndex(n);
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-1 w-[70%] max-md:w-full">
      <div className="relative">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`slides ${
              slideIndex === index + 1 ? "block" : "hidden"
            }`}
          >
            {loadedImages[index] ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${image}`}
                alt={`Slide ${index + 1}`}
                width={1700}
                height={650}
                className="h-[600px] max-sm:h-[300px]"
                onLoad={() => handleImageLoad(index)}
              />
            ) : (
              <div className="h-[600px] max-sm:h-[300px] flex items-center justify-center">
                <ClipLoader
                  className="text-[#201f1f]"
                  loading={true}
                  size={50}
                />
              </div>
            )}
          </div>
        ))}

        {images.length > 1 && (
          <>
            <div className="prevContainer absolute top-1/2 transform -translate-y-1/2 left-0 ml-6">
              <button
                className="prev bg-gray-800 rounded-r-full p-3 text-white"
                onClick={() => plusSlides(-1)}
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
                  <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
                </svg>
              </button>
            </div>

            <div className="nextContainer absolute top-1/2 transform -translate-y-1/2 right-0 mr-6">
              <button
                className="next bg-gray-800 rounded-l-full p-3 text-white"
                onClick={() => plusSlides(1)}
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="caption-container bg-gray-900 text-white p-2 mt-2">
        <p id="caption">{`Slide ${slideIndex}`}</p>
      </div>

      <div className="flex mt-4 space-x-2">
        {images?.map((image, index) => (
          <div key={index} className="flex justify-between gap-1">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${image}`}
              alt={`Thumbnail ${index + 1}`}
              height={200}
              width={200}
              className={`slide-thumbnail !h-[80px] !w-full cursor-pointer ${
                slideIndex === index + 1 ? "opacity-100" : "opacity-60"
              }`}
              onClick={() => currentSlide(index + 1)}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
