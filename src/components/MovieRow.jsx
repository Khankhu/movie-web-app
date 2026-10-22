"use client";
import { MovieCard } from "@/components/MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WheelGesturesPlugin from "embla-carousel-wheel-gestures";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function MovieRow({ movies, heading, description, category }) {
  return (
    <div className="max-w-screen-2xl mx-auto px-5">
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
        opts={{ slidesToScroll: "auto", dragFree: true }}
        plugins={[WheelGesturesPlugin()]}
        className="-mx-2"
      >
        <CarouselContent className="p-2">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-[15%]">
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
