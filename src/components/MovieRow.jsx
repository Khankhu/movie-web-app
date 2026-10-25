"use client";
import { MovieCard } from "@/components/MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MovieRow({ movies, heading, description, category }) {
  const [carouselApi, setCarouselApi] = useState(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const handleScroll = () => {
      const progress = carouselApi.scrollProgress();
      setIsAtStart(progress <= 0.01);
      setIsAtEnd(progress >= 0.99);
    };
    carouselApi.on("scroll", handleScroll);
    return () => carouselApi.off("scroll", handleScroll);
  }, [carouselApi]);

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-5">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-3xl font-extrabold tracking-tight">{heading}</h2>
        <Link
          href={`/category/${category}`}
          className="group text-primary text-sm font-semibold flex items-center gap-1 hover:opacity-80"
        >
          See all
          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      <p className="mb-2.5 text-muted-foreground">{description}</p>
      <Carousel
        setApi={setCarouselApi}
        opts={{ slidesToScroll: "auto", dragFree: true }}
        plugins={[WheelGesturesPlugin()]}
        className={cn(
          "-mx-2",
          !isAtStart && "**:data-[slot=carousel-content]:mask-l-from-93%",
          !isAtEnd && "**:data-[slot=carousel-content]:mask-r-from-93%",
        )}
      >
        <CarouselContent className="p-2">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-[15%] last:mr-2">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0.5 disabled:opacity-0" />
        <CarouselNext className="right-0.5 disabled:opacity-0" />
      </Carousel>
    </div>
  );
}
