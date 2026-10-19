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
      <h2>{heading}</h2>
      <Carousel>
        <CarouselContent>
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
