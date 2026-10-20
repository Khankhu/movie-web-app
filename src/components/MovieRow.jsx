import { MovieCard } from "@/components/MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function MovieRow({ movies, heading }) {
  return (
    <div className="max-w-screen-2xl mx-auto px-5">
      <h2 className="text-3xl font-extrabold tracking-tight mb-2">{heading}</h2>
      <Carousel className="-mx-2">
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
