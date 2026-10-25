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
import Image from "next/image";
import { TMDB_IMAGE_URL } from "@/lib/tmdb";

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

  const currentMovie = movies[currentIndex];

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 -bottom-96 -z-10 opacity-80 overflow-hidden mask-b-from-60%">
        <Image
          src={`${TMDB_IMAGE_URL}/w300${currentMovie.backdrop_path}`}
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-3xl scale-125"
        />
      </div>
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
      >
        <CarouselContent className="ml-0">
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="relative h-210 pl-0 mask-b-from-85%"
            >
              <HeroSlide movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-10 size-10 hover:bg-fuchsia-500 active:scale-90 bg-black/50 border-0 text-white hover:text-white" />
        <CarouselNext className="right-10 size-10 hover:bg-fuchsia-500 active:scale-90 bg-black/50 border-0 text-white hover:text-white" />

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
    </div>
  );
}
