import { MovieCard } from "./MovieCard";

export function MovieRow({ movies, heading }) {
  return (
    <div>
      <h2>{heading}</h2>
      <div className="flex gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
