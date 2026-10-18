import { Hero } from "@/components/Hero";
import { getMovieDetails, getNowPlayingMovies } from "@/lib/tmdb";

export default async function HomePage() {
  const movies = await getNowPlayingMovies();
  const detailedMovies = await Promise.all(
    movies.map((movie) => getMovieDetails(movie.id)),
  );
  // console.log(movies);

  return (
    <main>
      <Hero movies={detailedMovies} />
    </main>
  );
}
