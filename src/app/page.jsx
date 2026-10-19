import { Hero } from "@/components/Hero";
import { MovieRow } from "@/components/MovieRow";
import {
  getMovieDetails,
  getMoviesByCategory,
  getNowPlayingMovies,
} from "@/lib/tmdb";

export default async function HomePage() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const detailedMovies = await Promise.all(
    nowPlayingMovies.map((movie) => getMovieDetails(movie.id)),
  );
  const upcomingMovies = await getMoviesByCategory("upcoming");

  return (
    <main>
      <Hero movies={detailedMovies} />
      <MovieRow heading="Upcoming" movies={upcomingMovies} />
    </main>
  );
}
