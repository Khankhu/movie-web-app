# Алхам 1: Төсөл үүсгэх + Header-ийг layout-д холбох

> Огноо: 2026-10-08
> Төсөл: `Desktop/movie-web-app`
> Дизайн: Figma "Movie-Web-App" (Light / Dark mode + TDD)

---

## 🎯 Төслийн тойм (TDD-ээс)

- **Зорилго:** TMDB API-аас кино татаж харуулдаг вэбсайт
- **Tech stack:** Next.js (App Router), **JavaScript** (TypeScript биш — ангийн шаардлага), Tailwind CSS, shadcn/ui, Axios, SWR, TMDB API
- **Хуудсууд (5):** Home, Movie Details, Search, Genre, "See more" (Upcoming / Popular / Top Rated)
- **Давтагддаг component-ууд:** Header (Figma-д "Navigation"), Footer, MovieCard, Badge
- **Loader / Skeleton** — шинэ хуудас биш, өгөгдөл ачааллаж байх үеийн **төлөв (state)**

---

## ✅ Юу хийсэн

1. Node.js хувилбар шалгасан (`node -v` → v24.18.0)
2. Next.js төсөл үүсгэсэн: `npx create-next-app@latest movie-web-app`
   - JavaScript, ESLint, Tailwind CSS, `src/` folder, App Router
3. `src/components/Header.jsx` үүсгэж, `layout.js`-д холбосон
4. Browser дээр "Header" нь "Hello from Home"-ын дээр харагдсан

---

## 📚 Шинэ ойлголтууд

| English | Монгол | Энгийн тайлбар |
|---|---|---|
| Component | Бүрэлдэхүүн хэсэг | Дахин ашиглаж болох UI-ийн хэсэг (Lego шоо) |
| App Router | Хуудас чиглүүлэгч | `app/` доторх folder бүр = нэг URL |
| Route | Зам | Нэг URL хаяг (`/search`) |
| Dynamic route | Өөрчлөгддөг зам | `[id]` — ямар ч утга орж болно (`/movie/123`) |
| Query params | Хайлтын параметр | URL-ийн `?` хойно байх утга (`/search?query=wicked`) |
| Private folder | Хувийн folder | `_` тэмдэгтэй folder нь route болохгүй |
| layout.js | Хүрээ | Бүх хуудсыг ороодог "зургийн жааз" |
| `{children}` | Хүүхдүүд | Нээгдсэн хуудас яг энэ байранд орж ирнэ |
| dependencies | Үндсэн хамаарал | Апп ажиллахад хэрэгтэй (тоосго 🧱) |
| devDependencies | Хөгжүүлэлтийн хамаарал | Зөвхөн код бичих/build үед хэрэгтэй (шат 🪜) |
| ESLint | Кодын шалгагч | Алдаа, муу бичлэгийг автоматаар олно |
| default export | Үндсэн гаргалт | Файлын ганц гол зүйл. Import: `{ }`-гүй |
| named export | Нэртэй гаргалт | Хэд ч байж болно. Import: `{ }` заавал, нэр яг адил |
| PascalCase | Том үсгийн бичлэг | `MovieCard` — component-ийн нэр |
| kebab-case | Зураастай бичлэг | `movie-web-app` — folder/project-ийн нэр |

---

## 📌 Төслийн дүрэм (бүх төсөлд баримтална)

| Хаана | Бичлэг |
|---|---|
| `page.jsx`, `layout.js` | `export default function HomePage() {}` |
| `components/*.jsx` | `export function Header() {}` |
| `lib/*.js` | `export function getMovies() {}` |
| Component доторх жижиг функц | `() => {}` arrow |

**Нэг өгүүлбэрээр:** Next.js-ийн тусгай файл → default. Бусад бүх зүйл → named. Гаднах component → function, доторх жижиг функц → arrow.

**Import-ийн дараалал:**
1. Гадны package (`next`, `react`)
2. Өөрийн файл (`@/...`)
3. CSS

`@/` = `src/` folder-ын товчлол

---

## 🏗️ Зорилтот folder structure

```
src/
├── app/                    ← ХУУДСУУД
│   ├── layout.js
│   ├── page.jsx            → /
│   ├── movie/[id]/page.jsx → /movie/123
│   ├── movie/[id]/similar/page.jsx
│   ├── category/[category]/page.jsx → /category/upcoming
│   ├── search/page.jsx     → /search?query=...
│   └── genre/page.jsx      → /genre?genres=...
├── components/             ← ДАВТАГДДАГ ХЭСГҮҮД
│   ├── ui/                 (shadcn)
│   ├── Header.jsx  ✅
│   └── Footer.jsx
└── lib/                    ← ӨГӨГДӨЛ АВАХ
    └── tmdb.js
```

**Зарчим:** Бүгдийг нэг дор үүсгэхгүй. Хэрэгтэй үед нь нэг нэгээр нэмнэ.
**Static first, logic later** — эхлээд харагдах байдал, дараа нь ажиллагаа.

---

## ❌ Алдаа гаргаад сурсан зүйл

- **function + arrow холих:** `function Home() => {}` ❌ → аль нэгийг нь л сонгоно
- **`=` мартах:** `const Header () => {}` ❌ → `const Header = () => {}`
- **`export default const`** бичиж болохгүй ❌ → arrow бол 2 мөрөөр (`const X = ...` + `export default X;`)
- **Import path:** `from "Home"` ❌ → өөрийн файлд `"@/components/Header"`
- **`return` мартах:** component юу ч харуулахгүй
- **Нэр:** component-ийн нэр = файлын нэр (`Header.jsx` → `Header`)
- **Хашилт хаах:** `"...` ❌ → `"..."`
- **TypeScript:** TDD-д байсан ч ангийн шаардлагаар JavaScript ашиглана

---

## ⏭️ Дараагийн алхам

1. [ ] `layout.js`-ийн import дарааллыг засах (гадны package → өөрийн файл → CSS)
2. [ ] `components/Footer.jsx` **ганцаараа** хийж, `layout.js`-д `{children}`-ийн **доор** холбох
3. [ ] Дараа нь: Header-ийг Figma-гийн дизайнтай адилхан болгох (shadcn/ui суулгах)
