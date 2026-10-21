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
      <MovieRow
        heading="Upcoming Movies"
        description="Coming soon to theaters"
        movies={upcomingMovies}
      />
      <MovieRow
        heading="Popular Movies"
        description="What everyone is watching right now"
        movies={popularMovies}
      />
      <MovieRow
        heading="Top Rated Movies"
        description="The highest-rated films of all time"
        movies={topRatedMovies}
      />
    </main>
  );
}
