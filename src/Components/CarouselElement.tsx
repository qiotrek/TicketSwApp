import React, { useState } from 'react';

interface CarouselProps {
  data: { id: number; image: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === data.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? data.length - 1 : currentSlide - 1);
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div className="flex">
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`w-full transform transition-transform duration-300 ${
                index === currentSlide ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <img src={item.image} alt={`Slide ${item.id}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        {data.map((_, index) => (
          <button
            key={index}
            className={`mx-1 w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-0 rounded-full p-2 bg-gray-800 text-white"
        onClick={prevSlide}
      >
        {'<'}
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-0 rounded-full p-2 bg-gray-800 text-white"
        onClick={nextSlide}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Carousel;
