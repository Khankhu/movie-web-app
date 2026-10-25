"use client";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { HeroSlide } from "@/components/HeroSlide";

export function Hero({ movies }) {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
      api.plugins().autoplay.reset();
    };
    api.on("select", handleSelect);
    return () => api.off("select", handleSelect);
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
    >
      <CarouselContent className="ml-0">
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="relative h-210 pl-0">
            <HeroSlide movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        variant="default"
        className="left-10 size-10 hover:bg-fuchsia-500 active:scale-90"
      />
      <CarouselNext
        variant="default"
        className="right-10 size-10 hover:bg-fuchsia-500 active:scale-90"
      />

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map(({ id }, index) => (
          <button
            key={id}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex ? "w-6 bg-primary" : "w-2 bg-white/50",
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
}
