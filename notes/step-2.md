# Алхам 2: Layout — Header (харагдах байдал) + Footer

> Огноо: 2026-10-08
> Төсөл: `Desktop/movie-web-app`
> Дизайн: Figma "Movie-Web-App" → Homescreen → Navigation (node `1:749`)
> Өмнөх алхам: `step-1.md`

---

## ✅ Юу хийсэн

1. `components/Footer.jsx` үүсгэж, `layout.js`-д `{children}`-ийн **доор** холбосон 🥪
2. Semantic HTML: `<div>` → `<header>`, `<footer>`, `<main>`
3. `page.jsx`: `Home` → `HomePage` (төслийн дүрэм)
4. `metadata`: title `"Movie Z"`, description `"Discover popular, upcoming and top rated movies."`
5. **shadcn/ui** суулгасан (`npx shadcn@latest init`) → Base UI, Nova, Neutral
6. Font засвар: `Geist` → **`Inter`** (`--font-inter`), `globals.css`-ийн өөрийгөө заасан `--font-sans`-ийг зассан
7. **Header**-ийг Figma шиг болгосон (зөвхөн харагдах байдал, ажиллагаа байхгүй):
   - Container: `max-w-screen-2xl mx-auto px-5` (Figma 1280px-ээс арай өргөн, өөрийн сонголт)
   - 🎞️ Logo: `Film` icon + "MovieZ", `<Link href="/">`
   - ⌄ Genre товч: shadcn `Button` (`outline`, `lg`) + `ChevronDown`
   - 🔍 Search: shadcn `Input` (`npx shadcn@latest add input`) + `relative`/`absolute` icon
   - 🌙 Mode товч: shadcn `Button` (`outline`, `icon-lg`) + `Moon`

---

## 🧾 Одоогийн `Header.jsx`

```jsx
import { ChevronDown, Film, Moon, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header>
      <div className="flex justify-between items-center px-5 py-3 max-w-screen-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-indigo-700 font-bold italic text-xl">
          <Film />
          <span>MovieZ</span>
        </Link>

        <div className="flex gap-3 items-center">
          <Button variant="outline" size="lg">
            <ChevronDown />
            Genre
          </Button>

          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search..." type="search" className="w-full h-9 pl-9" />
          </div>
        </div>

        <Button variant="outline" size="icon-lg">
          <Moon />
        </Button>
      </div>
    </header>
  );
}
```

---

## 📚 Шинэ ойлголтууд

| English | Монгол | Энгийн тайлбар |
|---|---|---|
| Tag | Тэг | HTML-ийн "хайрцаг" (`<div>`, `<header>`) |
| Semantic HTML | Утгатай HTML | Шошготой хайрцаг 📦🏷️ — тэг нь өөрийн утгыг хэлдэг (`<header>`, `<main>`, `<footer>`, `<nav>`) |
| Metadata | Мета өгөгдөл | Хуудасны тухай мэдээлэл: `title` = tab-ын нэр, `description` = Google-д гарах тайлбар |
| String | Тэмдэгт мөр | `" "` доторх текст |
| shadcn/ui | UI component-ын цуглуулга | Бэлэн тавилга 🪑 — код нь таны төсөлд хуулагддаг (`components/ui/`) |
| init / add | Эхлүүлэх / нэмэх | `shadcn init` = анх суулгах, `shadcn add input` = нэг component нэмэх |
| `components.json` | shadcn тохиргоо | shadcn-ий "тэмдэглэлийн дэвтэр" 📒, гараар засахгүй |
| CSS variable | CSS хувьсагч | Нэртэй будгийн лааз 🎨 (`--background`) — dark mode-д доторх будаг солигдоно |
| Block element | Блок элемент | Бүтэн мөрийг эзэлдэг (`<div>`) → доош дараалдаг |
| Flexbox | Уян хатан хайрцаг | Номын тавиур 📚 — **эцэг** дээр `flex` тавихад хүүхдүүд нэг мөрөнд эгнэнэ |
| Container | Агуулгын хүрээ | Жааз 🖼️ — хамгийн их өргөнийг хязгаарлаж голлуулна (`max-w-* mx-auto`) |
| Padding / Margin | Дотор зай / Гадна зай | `px`, `py` = дотор; `mx-auto` = гадна автомат зай |
| Arbitrary value | Дурын утга | `[11.5px]` — стандарт утга огт тохирохгүй үед л |
| Icon (lucide-react) | Дүрс | React component — `import { Film } from "lucide-react"` → `<Film />` |
| `gap` | Хоорондын зай | Flex хүүхдүүдийн хоорондох зай |
| `<Link>` | Next.js-ийн холбоос | Хаалга 🚪 — зөвхөн өөрчлөгдсөн хэсгийг солино (`<a>` = байшингаа дахин барих 🏚️) |
| Auto-import | Автомат import | VS Code өөрөө import нэмдэг — **заавал шалгах** |
| Props | Шинж чанарууд | Component-ын тохиргоо ☕ (`variant="outline"`, `size="lg"`, `href="/"`) |
| Relative path / Alias | Харьцангуй зам / Товчлол | `./ui/button` vs `@/components/ui/button` — манай дүрэм: **`@/`** |
| `placeholder` | Түр бичиг | Хоосон input-д харагдах бүдэг бичиг |
| `relative` / `absolute` | Лавлагаа / Чөлөөт байрлал | Хөргөгчний хаалга 🧊 + соронзон 🧲 |
| Single Source of Truth | Үнэний ганц эх сурвалж | Нэг утга нэг л газар (жишээ: өргөнийг зөвхөн эцэгт) |
| Responsive design | Дэлгэцэд зохицох дизайн | Утас/том дэлгэц — **дараа** breakpoint-оор хийнэ |

---

## 📌 Төслийн дүрэм (нэмэгдсэн)

- Сайтын **доторх** шилжилт → `<Link>` (`next/link`, `{}`-гүй). Гадны сайт → `<a>`
- Өөрийн файлын import → **`@/`** (relative path биш)
- Auto-import-ийн дараа **import мөрийг шалгах** (`Link`, `Search`, `Image` гэх мэт нэр олон package-д давхцдаг)
- shadcn component-ыг өөрчлөх → `className` өгнө (`ui/*.jsx`-ийг шууд засахгүй). `cn()` зөрчилдсөн class-аас **сүүлийнхийг** авна
- Tailwind-ийн **стандарт** утга (`py-3`, `w-96`) > `[ ]` дурын утга
- Container өргөн: **`max-w-screen-2xl mx-auto px-5`** → Header, хуудас, Footer **бүгд ижил** байх ёстой
- Ашиглагдаагүй import-ийг устгах
- Хэмжээг гадна талын хайрцагт **нэг л газар** өгөх

---

## ❌ Алдаа гаргаад сурсан зүйл

- **`Link`-ийг `lucide-react`-аас import хийсэн** → 🔗 гинжний icon гарч, logo алга болсон. Next.js-ийн `Link` → `import Link from "next/link"`
- **Icon-ыг `<Button>`-ий гадна тавьсан** → "дотор" = нээх `<Button>` ба хаах `</Button>`-ий **хооронд**
- **Илүүдэл wrapper `<div>`** → shadcn Button өөрөө flex
- **`placeHolder`** ❌ → `placeholder` (React-д attribute-ийн нэр яг тодорхой)
- **`./ui/button`** → `@/components/ui/button`
- **`w-96` 2 газар** → зөвхөн эцэгт
- **`<p>` → `<span>`**: 2 үг бол догол мөр биш
- **shadcn-ий `--font-sans: var(--font-sans)`** 🔁 → Times гарсан. Өөрийгөө заасан хувьсагч ажиллахгүй

---

## ⏭️ Дараагийн алхам (Алхам 3)

1. [ ] **Footer**-ийг Figma шиг болгох (`Footer Content`, node `1:799` — ягаан-хөх дэвсгэр, logo, холбоо барих, social links). Container: Header-тэй **ижил**
2. [ ] Дараа нь: **Home хуудас** — Hero (Now Playing carousel), Upcoming / Popular / Top Rated жагсаалт, **MovieCard** component
3. Хойшлуулсан: Header-ийн **ажиллагаа** (Genre dropdown, хайлт, dark mode), **responsive** (утас)

**Санал болгох чатын нэр:** `Step 3 — Footer`
