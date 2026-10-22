const token = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

export async function getNowPlayingMovies() {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch now playing: ${res.status}`);
  }
  const data = await res.json();
  return data.results.slice(0, 5);
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch movie ${id}: ${res.status}`);
  }
  const data = await res.json();
  return data;
}

export async function getMoviesByCategory(category) {
  const res = await fetch(
    `${BASE_URL}/movie/${category}?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch movies ${category}: ${res.status}`);
  }
  const data = await res.json();
  return data.results;
}

export async function getTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?language=en-US`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch trending movies: ${res.status}`);
  }
  const data = await res.json();
  return data.results;
}
