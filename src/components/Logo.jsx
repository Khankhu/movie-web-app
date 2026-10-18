import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="text-3xl">
      <span className="bg-linear-to-br from-primary to-fuchsia-500 bg-clip-text text-transparent font-black tracking-wider">
        MOV
        <span className="text-[1.2em]">Z</span>
      </span>
    </Link>
  );
}
