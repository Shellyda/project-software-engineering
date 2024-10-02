'use client';
import React, { ReactNode, useRef, useEffect, useState } from 'react';
import './Slider.css';

interface SliderProps {
  children: ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderHeight, setSliderHeight] = useState<number>(0);

  useEffect(() => {
    if (sliderRef.current) {
      // Update the slider height based on the content
      const height = sliderRef.current.scrollHeight;
      setSliderHeight(height);
    }
  }, [children]);

  return (
    <>
      <div
        ref={sliderRef}
        className="slider overflow-x-auto min-h-fit-content max-w-screen-lg mx-auto scrollbar-hidden" // Ensures the slider fits the screen size
        style={{ height: `${sliderHeight}px` }} // Dynamically sets height
        aria-label="region"
        role="region"
      >
        <div className="flex whitespace-nowrap gap-x-2.5">{children}</div>
      </div>
    </>
  );
};

export default Slider;
