import { Hero } from "@/components/Hero";
import {
  getMovieDetails,
  getMoviesByCategory,
  getNowPlayingMovies,
} from "@/lib/tmdb";

export default async function HomePage() {
  const movies = await getNowPlayingMovies();
  const detailedMovies = await Promise.all(
    movies.map((movie) => getMovieDetails(movie.id)),
  );
  const upcomingMovies = await getMoviesByCategory("upcoming");

  return (
    <main>
      <Hero movies={detailedMovies} />
    </main>
  );
}
