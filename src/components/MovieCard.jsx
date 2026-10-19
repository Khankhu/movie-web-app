import { TMDB_IMAGE_URL } from "@/lib/tmdb";
import Image from "next/image";

export function MovieCard({ movie }) {
  const { title, poster_path } = movie;
  return (
    <div>
      <div className="relative aspect-2/3">
        <Image
          src={`${TMDB_IMAGE_URL}/w500${poster_path}`}
          alt={title}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <p>{title}</p>
    </div>
  );
}
