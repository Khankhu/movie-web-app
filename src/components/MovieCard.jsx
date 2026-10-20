import { TMDB_IMAGE_URL } from "@/lib/tmdb";
import Image from "next/image";

export function MovieCard({ movie }) {
  const { title, poster_path } = movie;
  return (
    <div className="group">
      <div className="relative aspect-2/3 overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
        <Image
          src={`${TMDB_IMAGE_URL}/w500${poster_path}`}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <p className="line-clamp-2 font-semibold mt-2">{title}</p>
    </div>
  );
}
