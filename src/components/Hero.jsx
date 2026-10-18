"use client";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroSlide } from "@/components/HeroSlide";

export function Hero({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev === movies.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }, [movies.length]);

  useEffect(() => {
    const id = setInterval(handleNext, 5000);
    return () => clearInterval(id);
  }, [currentIndex, handleNext]);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return movies.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  return (
    <section className="h-200 relative">
      <HeroSlide movie={movies[currentIndex]} />
      <div className="absolute left-10 top-1/2 -translate-y-1/2">
        <Button
          size="icon"
          className="rounded-full size-10 hover:bg-fuchsia-500 active:scale-90"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </Button>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        <Button
          size="icon"
          className="rounded-full size-10 hover:bg-fuchsia-500 active:scale-90"
          onClick={handleNext}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map(({ id }, index) => (
          <button
            key={id}
            className={cn(
              "h-3 rounded-full transition-all duration-400",
              index === currentIndex ? "w-7 bg-primary" : "w-3 bg-white/60",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
