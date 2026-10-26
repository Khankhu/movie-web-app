import { Info, Play, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TMDB_IMAGE_URL } from "@/lib/tmdb";

export function HeroSlide({ movie }) {
  const {
    title,
    release_date,
    genres,
    vote_average,
    overview,
    backdrop_path,
    runtime,
  } = movie;

  const year = release_date?.slice(0, 4) ?? "N/A";
  return (
    <>
      <Image
        src={`${TMDB_IMAGE_URL}/original${backdrop_path}`}
        alt={title}
        sizes="100vw"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent">
        <div className="h-full flex flex-col justify-center max-w-screen-2xl mx-auto px-5 text-white gap-5">
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-3 uppercase tracking-widest font-medium text-white/85">
              Now Playing{" "}
              <span className="h-px w-16 bg-white/70" aria-hidden="true"></span>
            </p>
            <h2 className="text-5xl font-extrabold tracking-tight max-w-xl">
              {title} ({year})
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500 text-black">
              <Star className="fill-current size-4" />
              <span className="font-bold">
                {vote_average?.toFixed(1) ?? "N/A"}
              </span>
            </div>
            <span>{year}</span>
            <span>{runtime ? `${runtime} min` : "N/A"}</span>
            <div className="flex items-center gap-2">
              {genres?.map(({ id, name }, index) => (
                <span key={id}>
                  {index > 0 && "• "}
                  {name}
                </span>
              ))}
            </div>
          </div>

          <p className="line-clamp-3 max-w-xl text-white/85">{overview}</p>

          <div className="flex gap-3">
            <Button
              size="lg"
              className="rounded-full h-11 px-6 text-base border-primary"
            >
              <Play className="fill-current size-3" /> Watch Trailer
            </Button>

            <Button
              size="lg"
              className="rounded-full bg-white/20 backdrop-blur h-11 px-6 text-base border-white/40 text-white"
            >
              <Info />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
