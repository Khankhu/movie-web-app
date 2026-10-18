# Алхам 5: Hero carousel (`useState`, `‹ ›` сум, цэгүүд)

> Огноо: 2026-10-16
> Төсөл: `Desktop/movie-web-app`
> Дизайн: Figma "Movie-Web-App" → Home → `upcoming` (node `1:800`). Баруун талд босоо голд `›` товч, доод голд `• • •` цэгүүд
> Figma file key: `B2VjQB6ZlFNHWKcRrM9bAx`
> Өмнөх алхам: `step-4.md`
> Төслийн явц: ~20–25% (Setup, Layout, Өнгөний систем, Hero харагдах байдал + carousel дууссан)

---

## ✅ Юу хийсэн

### 1. Mock data → 3 киноны array
- `NOW_PLAYING` (ганц object) → **`NOW_PLAYING_MOVIES`** (array of objects): Demon Slayer, Fight Club, American Psycho
- Кино бүрт **`id`** (TMDB-ийн жинхэнэ id: `1311031`, `550`, `1359`) болон **`backdrop_path`** нэмсэн
- Зураг: `public/heroo.png`, `public/fightclub.png`, `public/american.png`
- `<Image src={backdrop_path} />`: кино солигдоход зураг нь хамт солигдоно

### 2. `useState`: одоо хэддүгээр кино вэ
- `"use client"` (файлын хамгийн дээд мөр) + `import { useState } from "react"`
- `const [currentIndex, setCurrentIndex] = useState(0);`
- `NOW_PLAYING_MOVIES[currentIndex]`-аас destructuring хийнэ

### 3. `‹ ›` сумнууд (`handlePrev` / `handleNext`)
- Сүүлийн кино дээр `›` дарвал → эхнийх руу, эхний кино дээр `‹` дарвал → сүүлийнх руу (эргэлддэг 🔁)
- `.length - 1` ашигласан. `2` гэж хатуу бичээгүй тул кино нэмэгдсэн ч код өөрчлөгдөхгүй
- Байрлал: зүүн/баруун талд, **босоо голд**. Товч бүр **өөрийн `<div>`**-тэй (байрлал → div, товчны хэлбэр → Button)
- Өнгө: default violet + `hover:bg-fuchsia-500` + `active:scale-90`

### 4. Доод цэгүүд (dots)
- `.map((_, index) => <button />)`: кино бүрт нэг цэг
- Идэвхтэй цэг: `index === currentIndex` → **урт + violet** (`w-7 bg-primary`), бусад нь дугуй + бүдэг (`w-3 bg-white/60`)
- `transition-all duration-400` → өнгө нэг цэгээс нөгөө рүү "урсаж" шилжинэ
- Дарахад тэр кино руу шууд үсэрнэ: `onClick={() => setCurrentIndex(index)}`

---

## 🧾 Одоогийн `Hero.jsx` (логик + товчнууд)

```jsx
"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Info, Play, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NOW_PLAYING_MOVIES = [
  { id: 1311031, title: "Demon Slayer: ...", /* ... */ backdrop_path: "/heroo.png" },
  { id: 550, title: "Fight Club", /* ... */ backdrop_path: "/fightclub.png" },
  { id: 1359, title: "American Psycho", /* ... */ backdrop_path: "/american.png" },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex === NOW_PLAYING_MOVIES.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(NOW_PLAYING_MOVIES.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const {
    title,
    release_date,
    runtime,
    genres,
    vote_average,
    overview,
    backdrop_path,
  } = NOW_PLAYING_MOVIES[currentIndex];
  const year = release_date.slice(0, 4);

  return (
    <section className="h-200 relative">
      <Image src={backdrop_path} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent">
        {/* ... Hero-ийн бичиг, товчнууд (step-4-тэй адил) ... */}
      </div>

      <div className="absolute left-10 top-1/2 -translate-y-1/2">
        <Button
          size="icon"
          className="rounded-full size-10 hover:bg-fuchsia-500 active:scale-90"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </Button>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2">
        <Button
          size="icon"
          className="rounded-full size-10 hover:bg-fuchsia-500 active:scale-90"
          onClick={handleNext}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {NOW_PLAYING_MOVIES.map(({ id }, index) => (
          <button
            key={id}
            className={cn(
              "h-3 rounded-full transition-all duration-400",
              index === currentIndex ? "w-7 bg-primary" : "w-3 bg-white/60",
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
```

---

## 📚 Шинэ ойлголтууд

| English | Монгол | Энгийн тайлбар |
|---|---|---|
| Array of objects | Object-уудын жагсаалт | Дугаартай шүүгээ 🗄️, тасалгаа бүрт нэг кино |
| Index | Дугаар | **0**-ээс эхэлнэ. 3 кино → 0, 1, 2 |
| Bracket notation | Дөрвөлжин хаалтаар хандах | `array[0]` = "0 дугаартайг **нээ**". Ганцаараа `[0]` = **шинэ array** (өөр утга!) |
| `backdrop_path` | Арын зургийн зам | Хэвтээ өргөн зураг (Hero). `poster_path` = босоо постер (MovieCard) |
| `.length` | Урт | Хэдэн элемент байгаа. Сүүлийн дугаар = `.length - 1` (3 давхар байшин → дээд давхар 2) |
| `undefined` | Тодорхойгүй | Байхгүй тасалгааг нээвэл (`[3]`) гарна → destructuring алдаа 💥 |
| State | Төлөв | Онооны самбар 🏀. Утга солигдоход React дэлгэцийг **дахин зурна** |
| `useState(0)` | State үүсгэх | `[утга, setУтга]` 2 зүйл буцаана. `0` = эхлэх утга |
| `currentIndex` / `setCurrentIndex` | Утга / солих функц | Зурагтын сувгийн дугаар 📺 / удирдлагын товч 🔘 |
| Hook | Дэгээ | `use`-ээр эхэлдэг React функц |
| Re-render | Дахин зурах | State солигдоход component дахин ажиллана |
| Server / Client Component | Сервер / Browser component | Next.js-д анхдагчаар server. `useState` хэрэглэвэл → `"use client"` |
| Event / `onClick` | Үйл явдал / дарахад | "Дарахад энэ функцийг ажиллуул" |
| Event handler | Үйл явдлыг барих функц | `handle` + үйлдэл гэж нэрлэнэ (`handleNext`) |
| `() =>` боодол 🎁 | Arrow function | `onClick={setX(5)}` → **шууд** ажиллана ❌. `onClick={() => setX(5)}` → дарахад ✅ |
| Concise vs Block body | Богино / блок хэлбэр | `() => x` (ганц үйлдэл) vs `() => { ... }` (олон мөр) |
| `onClick={handleNext}` | Функцийн нэр дамжуулах | `()` **бичихгүй**, бичвэл шууд ажиллана 🔔 |
| `===` | Яг тэнцүү | Хоёр утгыг харьцуулна |
| `Array` vs `NOW_PLAYING_MOVIES` | JS-ийн үйлдвэр vs манай жагсаалт | `Array.length` ≠ манай киноны тоо 🏭 |
| Ternary `? :` | Гурвалсан оператор | `нөхцөл ? А : Б`. Замын салаа 🛣️. `&&` = "үнэн бол л", ternary = "А эсвэл Б" |
| `cn()` | Class нийлүүлэгч | `cn("бүгдэд", cond ? "А" : "Б")`. shadcn-ийн стандарт. `@/lib/utils` |
| Scope | Хүрээ | `index` нь зөвхөн `.map()`-ийн дотор байна (ангийн самбар 🏫) |
| Closure (наалт 🏷️) | Хадгалсан утга | `.map()` бүр товч бүрт өөрийн `index`-ийг "наадаг" |
| `top-1/2 -translate-y-1/2` | Босоо голлолт | Зураг өлгөх 🖼️. Дээд ирмэг голд → өөрийн хагасаар дээш |
| `left-1/2 -translate-x-1/2` | Хэвтээ голлолт | Мөн адил, хэвтээ чиглэлд |
| `variant` / `size` (shadcn) | Хувилбар / хэмжээ | Бэлэн хувцас 👕. `default` = `bg-primary`. `size="icon"` = `size-8` |
| Icon size | Icon-ийн хэмжээ | Товч ≠ icon. shadcn icon анхдагч `size-4` |
| State variant (`hover:`, `active:`) | Нөхцөлт class | "Ямар үед" ажиллах. Хувцасны горим 👔🎩 |
| Transition | Зөөлөн шилжилт | `transition-all duration-300` → утга урсаж солигдоно 🌊 |
| Accessibility / `aria-label` | Хүртээмж / нэр шошго | Icon-той товчинд screen reader-т зориулсан нэр (одоохондоо хийгээгүй) |
| Self-closing tag | Өөрөө хаагддаг tag | Дотроо юмгүй бол `<button ... />` |
| Prettier | Код цэгцлэгч | Урт мөрийг автоматаар олон мөр болгоно |

---

## 📌 Төслийн дүрэм (нэмэгдсэн)

- Жагсаалт агуулсан хувьсагчийн нэр **олон тоо** (`NOW_PLAYING_MOVIES`)
- Array-ийн хэмжээг **хатуу бичихгүй** → `.length`, `.length - 1`
- State-ийг **шууд өөрчлөхгүй** (`currentIndex = 0` ❌) → зөвхөн `setCurrentIndex(...)`
- `set...()` хаалтан дотор зөвхөн **шинэ утга** (`setCurrentIndex(0)`, `setCurrentIndex(index)`)
- Олон мөр логикийг JSX дотор биш, `return`-ийн **өмнө** `handleX` функц болгоно
- `useState` ашиглах файлд хамгийн дээд мөрөнд `"use client"`
- Import дараалал: `react` → бусад сан → `@/` өөрийн файлууд
- Нөхцөлт class → `cn("бүгдэд", cond ? "А" : "Б")`. 2 салаанд давхардсан class → эхний хэсэгт
- **Онцгой тохиолдол:** `translate` зөрчилдөх үед (голлолт + shadcn-ийн `active:translate-y-px`) байрлалыг **div**, товчийг **Button** гэж салгана
- Дарах эффектэд `active:translate-*` биш **`active:scale-*`** ашиглана
- Жижиг цэг/хэлбэрт shadcn `<Button>` биш энгийн `<button>` (өөрийн `h-8 px-2.5` хэмжээ саад болдог)
- Тэмдэгт (`•`) биш **CSS хэлбэр** (`size-2 rounded-full`). Хэмжээ, хэлбэрийг нарийн удирдана
- Hero-д ~**5** кино (том сайтуудын жишиг). API-ийн 20 киноноос `.slice(0, 5)`

---

## ❌ Алдаа гаргаад сурсан зүйл

- **Array-ийн `];` устсан** → `export` дээр алдаа (нээсэн хаалт бүр хаагдах ёстой)
- **`NOW_PLAYING_MOVIES`-ээс шууд destructuring** → `title` олдохгүй. `[0]` / `[currentIndex]` хэрэгтэй
- **3 удаа дарахад `[3]`** → `undefined` → алдаа. Эргэлддэг логикоор зассан
- **`lenght`** → `length` (бичгийн алдаа)
- **`Array.length`** → JS-ийн үйлдвэр 🏭, манай array биш
- **`currentIndex = [0]`** → state-ийг шууд өөрчилсөн + `[0]` бол array. `setCurrentIndex(0)` зөв
- **`setCurrentIndex((currentIndex (0))`**, **`setCurrentIndex(currentIndex(index))`** → `currentIndex` бол тоо, функц биш. 2 удаа давтагдсан ⚠️
- **`[0] + 1` → `"01"`**: JS array-ийг текст болгоод наадаг
- **`handlePrev`-д `else` дутуу**, `-1` буруу салаанд байсан
- **2 товч яг нэг газар** (`absolute right-8`) давхцсан
- **`rounded-ful`** → Tailwind буруу class-ыг **чимээгүй** алгасдаг
- **Сум заримдаа ажиллахгүй, дээш доош үсэрнэ** → `-translate-y-1/2` + shadcn-ийн `active:translate-y-px` зөрчилдөж, дарахад товч 21px доош үсэрч click тооцогдоогүй. Div-ээр салгаж зассан

---

## ⏭️ Дараагийн алхам (Алхам 6)

Сонголтууд:
1. [ ] **`HeroSlide` component + props**: Hero-ийн бичгийн хэсгийг тусад нь салгах (Logo-гийн дараагийн шат)
2. [ ] **Автоматаар гүйдэг carousel** (5 секунд тутам): шинэ ойлголт `useEffect`, `setInterval`
3. [ ] **TMDB API холбох**: `.env.local`-д key, `now_playing` → `.slice(0, 5)`, `/movie/{id}` (runtime, genres)
4. Хойшлуулсан:
   - Icon товчнуудад `aria-label` (`"Previous movie"`, `"Next movie"`, `` `Go to slide ${index + 1}` ``)
   - `‹` товч бичигтэй давхцаж байгаа эсэхийг шалгах (Figma дээр бичиг зүүн талаасаа 140px зайтай)
   - Сум, цэгийн давхардсан class-ыг нэгтгэх
   - MovieCard + Upcoming / Popular / Top Rated жагсаалт
   - Dark mode, responsive, trailer modal
   - `heroo.png` → `hero.png` нэр засах (сонголтоор)

**Санал болгох чатын нэр:** `Step 6 — ...` (сонгосон сэдвээр)
