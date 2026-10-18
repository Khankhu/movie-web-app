# Алхам 4: Home — Hero (харагдах байдал) + Өнгөний систем + Logo component

> Огноо: 2026-10-15
> Төсөл: `Desktop/movie-web-app`
> Дизайн: Figma "Movie-Web-App" → Home → Homescreen → `upcoming` (node `1:800`, Hero 1440×600)
> Figma file key: `B2VjQB6ZlFNHWKcRrM9bAx`
> Санаа авсан сайт: Wowkino (Hero бүтэц, товчны хэлбэр)
> Өмнөх алхам: `step-3.md`

---

## ✅ Юу хийсэн

### Hero (`components/Hero.jsx`) — зөвхөн харагдах байдал, mock data-аар
1. **Mock data** `NOW_PLAYING` — TMDB-ийн **`/movie/{id}` (дэлгэрэнгүй)** хэлбэрээр: `title`, `release_date`, `runtime`, `genres`, `vote_average`, `overview`
   - ⚠️ `runtime`, `genres` (нэртэй) нь `now_playing` жагсаалтад **байхгүй** → H.4 дээр кино бүрийн дэлгэрэнгүйг тусад нь татна
2. `public/heroo.png` → `next/image` + `fill` + `object-cover`, эцэг `<section>` дээр `relative`
3. Зурган дээр **"тунгалаг шил"** давхарга: `absolute inset-0` + gradient `bg-linear-to-r from-black/80 via-black/50 to-transparent`
4. Дотор нь **container** (`max-w-screen-2xl mx-auto px-5`) → бичиг Header-ийн logo-той нэг шугамд
5. **4 бүлэг** (container `flex flex-col justify-center gap-5`):
   - Бүлэг 1: `NOW PLAYING:` + `<h2>{title} ({year})</h2>` (`gap-2`)
   - Бүлэг 2: мэдээллийн мөр — ⭐ шар badge + он + `min` + жанрууд (`•` тусгаарлагчтай)
   - Бүлэг 3: overview (`line-clamp-3 max-w-xl`)
   - Бүлэг 4: `▶ Watch Trailer` (violet, гол) + `ⓘ More Info` (шилэн, хоёрдогч), `rounded-full`
6. Өндөр: Figma 600px → **`h-200`** (өөрийн сонголт, багш нар зөвшөөрдөг)

### Өнгөний систем (`globals.css` → `:root`)
- `--primary` → **violet** `oklch(0.606 0.25 292.717)` (teal туршаад, буцаад violet сонгосон)
- `--background` → цав цагаан биш, **цайвар саарал** `oklch(0.967 0.001 286.375)` (zinc-100)
- `--border`, `--input` → `oklch(0.885 0 0)` (арай тод хүрээ)
- Header → `bg-card border-b` ("ширээ" давхарга, цагаан)
- Footer → **үргэлж бараан** `bg-zinc-950 border-t border-white/10`, бичиг `text-zinc-400` (гарчгууд ч зориуд бүдэг), холбоос `hover:text-primary`

### Logo (`components/Logo.jsx`) — шинэ component
- Icon-гүй **wordmark**: `MOV` + том `Z`, бүхэлдээ violet → fuchsia **gradient бичиг**
- Header, Footer хоёулаа `<Logo />` → нэг газар засахад хоёуланд нь солигдоно
- Брэндийн нэр: **MOVZ** (copyright, имэйл ч тааруулсан)

---

## 🧾 Одоогийн `Hero.jsx`

```jsx
import { Info, Play, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NOW_PLAYING = {
  title: "Demon Slayer: Kimetsu no Yaiba Infinity Castle",
  release_date: "2025-07-18",
  runtime: 155,
  genres: [
    { id: 16, name: "Animation" },
    { id: 28, name: "Action" },
    { id: 14, name: "Fantasy" },
  ],
  vote_average: 8.3,
  overview:
    "The Demon Slayer Corps are drawn into the Infinity Castle, where Tanjiro and the Hashira face terrifying Upper Rank demons in a desperate fight as the final battle against Muzan Kibutsuji begins.",
};

export function Hero() {
  const { title, release_date, runtime, genres, vote_average, overview } =
    NOW_PLAYING;
  const year = release_date.slice(0, 4);

  return (
    <section className="h-200 relative">
      <Image src="/heroo.png" alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent">
        <div className="h-full flex flex-col justify-center max-w-screen-2xl mx-auto px-5 text-white gap-5">
          <div className="flex flex-col gap-2">
            <p className="uppercase tracking-widest font-medium text-white/85">
              Now Playing:
            </p>
            <h2 className="text-5xl font-extrabold tracking-tight max-w-xl">
              {title} ({year})
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500 text-black">
              <Star className="fill-current size-4" />
              <span className="font-bold">{vote_average}</span>
            </div>
            <span>{year}</span>
            <span>{runtime} min</span>
            <div className="flex items-center gap-2">
              {genres.map(({ id, name }, index) => (
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
    </section>
  );
}
```

## 🧾 Одоогийн `Logo.jsx`

```jsx
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
```

---

## 📚 Шинэ ойлголтууд

| English | Монгол | Энгийн тайлбар |
|---|---|---|
| Mock data | Хуурамч өгөгдөл | API-г дуурайсан гар өгөгдөл. **TMDB-ийн нэрээр** бичнэ (`title`, `vote_average`) → API холбоход JSX өөрчлөгдөхгүй |
| Infinite recursion | Төгсгөлгүй өөрийгөө дуудах | `Hero` дотор `<Hero>` → жор дотор "энэ жорыг хий" 🔁. Том үсэг = component, жижиг = HTML tag |
| `public/` | Нийтийн folder | Үзэсгэлэнгийн тавиур 🪟 — `public/hero.png` → хаяг `/hero.png` (`public` үг ордоггүй) |
| `next/image` | Ухаалаг зураг | Автомат шахалт, `alt` заавал. Агуулгын зураг → `<Image>`, чимэглэл → CSS bg |
| `fill` | Эцгийг дүүргэх | Дотроо `absolute` → эцэг дээр **`relative`** заавал, үгүй бол цонх руу "зугтана" |
| Containing block | Агуулагч хайрцаг | `absolute` нь `position`-той хамгийн ойрын өвгөө "ээж" гэж үзнэ |
| `object-cover` | Тайрч дүүргэх | Wallpaper шиг — хэлбэр алдагдахгүй |
| `inset-0` | 4 талаас 0 | Эцгийг бүтэн бүрхэх давхарга |
| Stacking order | Давхарлалтын дараалал | Цаас овоолох 📄 — кодонд **доор** бичсэн нь дэлгэц дээр **дээр** гарна. Өөрчлөх → `z-*` |
| Background | Ард талын дэвсгэр | Элементийн **агуулгын ард** зурагдана → `<Image>` дээр gradient өгвөл зургийн ард нуугдана |
| Main / Cross axis | Гол / Хөндлөн тэнхлэг | `justify-*` = дараалал явах чиглэл, `items-*` = перпендикуляр. `flex-col` нь хоёрыг **сольдог** |
| Stretch | Сунах | `flex-col`-ийн хүүхдүүд анхдагчаар бүтэн өргөнөөр сунана (шат 🪜) |
| Block element | Блок элемент | Class-гүй `<div>` = бүтэн өргөн, дээрээс доош. Зэрэгцүүлэх → эцэгт `flex` |
| Grouping | Бүлэглэх | Дизайныг эхлээд **бүлгүүдэд** хуваа 📦 — бүлэг доторх зай жижиг, бүлэг хооронд том |
| `.slice(start, end)` | Хэрчих ✂️ | `"2025-07-18".slice(0, 4)` → `"2025"`. 0-ээс тоолно, `end` орохгүй |
| `" "` vs `{ }` (JSX) | Текст vs JS | `( )` хаалт = энгийн текст → `{ }`-ийн **гадна**: `{title} ({year})` |
| Object key ≠ variable | Талбар ≠ хувьсагч | `{title}` → "not defined". Үнэмлэх 🪪 доторх мөр ширээн дээр хэвтэхгүй → `NOW_PLAYING.title` эсвэл destructuring |
| Destructuring (`const {..} = obj`) | Задлах | 3+ талбар хэрэгтэй бол **B** — `return`-ийн өмнө. Бэлтгэлийн ширээ 🔪 |
| Nested data | Давхарласан өгөгдөл | Object дотор array, түүн дотор object (`genres`) |
| `.map((item, index) => ...)` | 2-р параметр = дугаар | 0-ээс эхэлнэ |
| `&&` | Хамгаалагч 💂 | `{cond && <X/>}` — үнэн бол харуул. **Conditional rendering** |
| `.` vs `·` vs `•` | Өөр тэмдэгтүүд | `.` доод шугамд, `·`/`•` голд. Mac: `Opt+Shift+9` = `·`, `Opt+8` = `•` |
| `line-clamp-3` | 3 мөрөөр тайрах | Үлдсэн нь `...` |
| Design token | Дизайны хувьсагч | Будгийн сав 🪣 — `--primary` → `bg-primary`/`text-primary`. Нэг газар солиход бүх сайт солигдоно |
| CSS variable | CSS хувьсагч | `--нэр: утга;` — **`;` заавал**. Дутуу бол browser **чимээгүй хаяна** |
| `oklch(L C H)` | Өнгө бичих арга | гэрэл / тодрол / өнгөний тойрог 🎡 (H: 182 teal, 277 indigo, 293 violet, 304 purple) |
| Hard refresh | Хатуу шинэчлэх | `Cmd+Shift+R`. Болохгүй бол dev server-ээ дахин асаа |
| Contrast | Ялгаатай байдал | Онцлох нь **хүрээлэл өөр** байхад л ажиллана |
| Inheritance | Өвлөлт | `color` эцгээс хүүхдэд дамжина. Хүүхэд өөрөө өгвөл давуу |
| Gradient text | Солонгорсон бичиг | `bg-linear-to-br from-.. to-..` + `bg-clip-text` + `text-transparent`. Хүүхэд дээр өнгө өгвөл таглана |
| Wordmark | Үсгэн лого | Icon-гүй, зөвхөн бичиг (Netflix, Wowkino) |
| `em` unit | Харьцангуй нэгж | `text-[1.2em]` = эцгээс 1.2 дахин. Эцгийг томруулахад харьцаа хадгалагдана |
| Reusable component | Дахин ашиглах component | Тамга 🔖 — `Logo.jsx` нэг удаа, Header/Footer-т `<Logo />` |
| Surface / Elevation | Гадаргуу / давхарга | Шал (`--background` саарал) → ширээ (`--card` цагаан) → эд зүйл (хүрээтэй) |
| Inverted section | Урвуу хэсэг | Light хуудас дотор зориуд бараан хэсэг (Hero, Footer) |
| Primary / Secondary action | Гол / Хоёрдогч үйлдэл | Нэг дэлгэцэнд **ганц** тод товч |
| Glass button | Шилэн товч | `bg-white/20 border-white/40 text-white backdrop-blur` |
| Optical size | Нүдний хэмжээ | ▶ гурвалжин ⓘ дугуйгаас жижиг харагдана — тоо биш, нүдээр тааруулна |

---

## 📌 Төслийн дүрэм (нэмэгдсэн)

- Mock data-г **API-ийн талбарын нэрээр** бичнэ (үсэг бүрээр нь)
- Component-ын `return` дотор **өөрийнх нь нэрийг** бичихгүй
- `fill` зураг → эцэг дээр `relative` + өндөр
- Зурган дээрх давхарга → `absolute inset-0`, gradient нь **давхарга дээр** (зураг дээр биш)
- Тооцоолол (`.slice()`, destructuring) → `return`-ийн **өмнө**, JSX-д зөвхөн бэлэн утга
- Бүлэг бүр өөрийн хайрцагтай, зайг **эцэг** `gap`-аар удирдана. Бүлгүүдийн хооронд кодонд **хоосон мөр**
- Ганц элементтэй бүлгийг `<div>`-ээр ороохгүй — зөв эцэгт нь тавина
- `gap` ажиллуулахын тулд текст бүр өөрийн `<span>`-тэй
- Жагсаалтын тусгаарлагч → `{index > 0 && "• "}` (зай нь хашилт дотор)
- Өнгө → **token** (`bg-primary`, `bg-card`, `bg-background`). Mode-оор солигдохгүй хэсэг (Footer) л шууд өнгө
- CSS-д мөр бүр `;`-ээр төгсөнө
- shadcn Button: өнгөө `variant`-гүй (default) + `className`-оор дарж өөрчлөх (`outline`-ийн `dark:` class-ууд дарж магадгүй)
- Logo → `<Logo />` component (давхардуулж хуулахгүй)
- Class-ын дараалал: байрлал → зай/хэмжээ → хүрээ/өнгө → бичиг
- Ашиглагдаагүй import устгах, import → `@/` (auto-import-ийн `./`-ийг шалга)

---

## ❌ Алдаа гаргаад сурсан зүйл

- **`<Hero>` дотор `<Hero>`** → infinite recursion
- **`relative` мартсан** → `fill` зураг бүтэн цонхыг эзэлсэн
- **`alt={"title"}`** → `{ }` дотор хашилт = хатуу текст. `alt={title}` зөв
- **`{title}` destructuring-гүй** → "title is not defined"
- **`vote_avarage`, `"Fantacy"`** бичгийн алдаа
- **Gradient-ийг `<Image>` дээр** өгсөн → зургийн ард нуугдсан
- **`flex-col` дээр `items-center`** → хэвтээ голлогдсон. Босоо → `justify-center`
- **Badge `flex-col`-ийн хүүхэд** → бүтэн өргөнөөр сунасан
- **Class-гүй мөр `<div>`** → badge сунаж, он/хугацаа доод мөрөнд
- **`{year} {runtime} min`** нэг текст → `gap` ажиллаагүй
- **`.map({name}) => name`** → `.map((` гадна хаалт дутуу
- **`{index} > 0 ?&&{name}`** → нөхцөл бүхэлдээ **нэг** `{ }` дотор
- **`"."`** → доод шугамд. `·`/`•` хэрэглэ
- **`<p>` мэдээллийн мөр дотор** → хажуу тийш орсон (буруу эцэг)
- **`;` устгачихсан** (`globals.css`) → 2 хувьсагч эвдэрч logo хар болсон
- **`<Link>` дээр `text-primary`** → "Z" онцгойрохгүй (бүгд ижил өнгө)
- **Хүснэгтийн "дарагдах" баганыг хуулсан** → `hover:bg-primary/80`, `text-primary-foreground`

---

## ⏭️ Дараагийн алхам (Алхам 5)

1. [ ] **H.3 — Hero carousel**: `NOW_PLAYING` → **3 киноны array**, ‹ › сум + доод цэгүүд (Wowkino шиг баруун доод буланд)
   - Шинэ ойлголт: **`useState`**, **Client Component** (`"use client"`)
   - Hero-ийн JSX-ийг `HeroSlide` component болгож **props** дамжуулах (Logo-гийн дараагийн шат)
2. [ ] H.4 — TMDB API (`.env.local`-д key, `now_playing` + `/movie/{id}`)
3. [ ] MovieCard + Upcoming / Popular / Top Rated жагсаалт (`grid`)
4. Хойшлуулсан:
   - **Dark mode** — `.dark { }` token-уудыг тохируулах (`--primary` арай цайвар violet гэх мэт)
   - Товчны ажиллагаа (trailer modal, Details → `/movie/[id]`)
   - `prettier-plugin-tailwindcss` (class-ыг автоматаар эрэмбэлэх)
   - Header-ийн ажиллагаа (Genre, хайлт), responsive (утас)
   - `heroo.png` → `hero.png` нэр засах (сонголтоор)

**Санал болгох чатын нэр:** `Step 5 — Hero carousel (useState)`
