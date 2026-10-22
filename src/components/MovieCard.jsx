import { TMDB_IMAGE_URL } from "@/lib/tmdb";
import { Star } from "lucide-react";
import Image from "next/image";

export function MovieCard({ movie }) {
  const { title, poster_path, release_date, vote_average } = movie;
  return (
    <div className="group">
      <div className="relative aspect-2/3 overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
        <Image
          src={`${TMDB_IMAGE_URL}/w500${poster_path}`}
          alt={title}
          sizes="15vw"
          fill
          className="object-cover"
        />
      </div>
      <p className="truncate font-semibold mt-2">{title}</p>
      <div className="flex items-center text-sm text-muted-foreground gap-1">
        <Star className="fill-current size-3.5" />
        <span>
          {vote_average ? vote_average.toFixed(1) : "N/A"} •{" "}
          {release_date?.slice(0, 4) ?? "N/A"}
        </span>
      </div>
    </div>
  );
}
