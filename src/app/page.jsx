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
  const popularMovies = await getMoviesByCategory("popular");
  const topRatedMovies = await getMoviesByCategory("top_rated");

  return (
    <main className="flex flex-col gap-10 pb-10">
      <Hero movies={detailedMovies} />
      <MovieRow heading="Upcoming Movies" movies={upcomingMovies} />
      <MovieRow heading="Popular Movies" movies={popularMovies} />
      <MovieRow heading="Top Rated Movies" movies={topRatedMovies} />
    </main>
  );
}
