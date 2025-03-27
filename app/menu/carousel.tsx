"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";

type CarouselProps = {
  children: React.ReactNode;
  options?: Record<string, any>;
};

const Carousel: React.FC<CarouselProps> = ({ children, options }) => {
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden" ref={emblaRef}>
      <div className="flex cursor-grab gap-4">{children}</div>
    </div>
  );
};

export default Carousel;