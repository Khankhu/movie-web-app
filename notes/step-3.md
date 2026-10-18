# Алхам 3: Layout — Footer (харагдах байдал) + `.map()`

> Огноо: 2026-10-12
> Төсөл: `Desktop/movie-web-app`
> Дизайн: Figma "Movie-Web-App" → Homescreen → Footer Content (node `1:799`)
> Өмнөх алхам: `step-2.md`

---

## ✅ Юу хийсэн

1. **Footer**-ийг Figma шиг болгосон (зөвхөн харагдах байдал):
   - **Full-bleed** дэвсгэр: `bg-indigo-700` → гадна `<footer>`, container (`max-w-screen-2xl mx-auto px-5`) → дотор `<div>`
   - Зүүн тал: Logo (`Film` + "MovieZ") + copyright
   - Баруун тал: Contact Information (`Mail`, `Phone` icon) + Follow us (social links)
2. `my-10` → **`py-10`** (өнгөт хайрцгийн дотор зай)
3. `relative`/`absolute` + `h-10` бүхий icon байрлалыг → **`flex items-center gap-3`** болгосон
4. `<h1>` → `<h3>`, `text-white-700` (байхгүй class) устгасан
5. Зайг `pb-*`-ээс → эцэг дээрх **`flex flex-col gap-*`** болгосон (grouping)
6. Social links: `<span>` → **`<a>`** + `target="_blank"` + `rel="noopener noreferrer"` + `hover:underline`
7. 4 давтагдсан `<a>` → **`SOCIAL_LINKS` array + `.map()`** (A → B destructuring руу refactor)

**Layout (Header + Footer) бүрэн дууслаа** 🎉

---

## 🧾 Одоогийн `Footer.jsx`

```jsx
import { Film, Mail, Phone } from "lucide-react";

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com" },
  { name: "Instagram", href: "https://instagram.com" },
  { name: "X", href: "https://x.com" },
  { name: "Youtube", href: "https://youtube.com" },
];

export function Footer() {
  return (
    <footer className="bg-indigo-700">
      <div className="flex justify-between max-w-screen-2xl mx-auto px-5 text-white py-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 font-bold italic text-xl">
            <Film />
            <span>MovieZ</span>
          </div>
          <p>© 2026 MovieZ. All Rights Reserved.</p>
        </div>

        <div className="flex gap-24">
          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Contact Information:</h3>
            <div className="flex flex-col gap-6">
              <div className="flex gap-3 items-center">
                <Mail className="size-5" />
                <div className="flex flex-col">
                  <p className="font-medium">Email:</p>
                  <p>support@movieZ.com</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="size-5" />
                <div className="flex flex-col">
                  <p className="font-medium">Phone:</p>
                  <p>+976 (11) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-medium">Follow us:</h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## 📚 Шинэ ойлголтууд

| English | Монгол | Энгийн тайлбар |
|---|---|---|
| Full-bleed background | Бүтэн өргөнтэй дэвсгэр | Хана ба зураг 🧱🖼️ — будаг ирмэг хүртэл, агуулга container дотор |
| Padding / Margin | Дотор / Гадна зай | Бэлгийн хайрцаг 🎁 — padding өнгөтэй, margin өнгөгүй |
| Margin collapse | Margin "нийлэх" | Эцэг padding-гүй бол хүүхдийн margin гадагш урсдаг (эцэг нь flex item бол болохгүй) |
| DevTools box model | Хайрцгийн загвар | Browser-ын DevTools дээр margin/border/padding-ийг px-ээр харуулдаг |
| `gap` | Хоорондын зай | Зөвхөн **`flex` / `grid`** дотор ажиллана |
| Grouping | Бүлэглэх | Зай өөр бол өөр хайрцагт хийнэ 📦 |
| Refactoring | Кодыг сайжруулах | Харагдах байдлыг өөрчлөхгүйгээр кодын бүтцийг цэгцлэх |
| Consistency | Тууштай байдал | Нэг асуудлыг файл даяар **нэг** аргаар шийдэх |
| `<a>` attribute vs content | Тохиргоо vs бичиг | Хаалга 🚪 — `<a [тохиргоо]>[харагдах бичиг]</a>` |
| `target="_blank"` | Шинэ tab | Үргэлж `rel="noopener noreferrer"`-тэй хамт |
| `hover:` | Хулгана очих үед | `hover:underline` |
| DRY | Өөрийгөө бүү давт | Don't Repeat Yourself |
| Object / key / value | Объект / шошго / утга | Үнэмлэх 🪪 — `{ name: "Бат" }` |
| Array of objects | Объектын жагсаалт | Үнэмлэхний овоо 📚 — `[{...}, {...}]` |
| Trailing comma | Төгсгөлийн таслал | Сүүлийн элементийн ард ч `,` |
| `UPPER_SNAKE_CASE` | Тогтмолын нэр | Өөрчлөгддөггүй утга (`SOCIAL_LINKS`, `MOVIES`) |
| `.map()` | Хувиргах | Тамга 🔖 — элемент бүрийг нэг загвараар JSX болгож шинэ array буцаана |
| Parameter | Параметр | `(link)` — одоогийн нэг элементийг хүлээж авах хайрцаг. Нэр = array-ийн ганц тоо |
| `key` | Түлхүүр | Жагсаалтын элемент бүрийн давхцахгүй, тогтвортой нэр 🔑 |
| Destructuring | Задлах | `({ name, href })` — илгээмжийг үүдэнд нь задлах 📦 |
| `" "` vs `{ }` | Текст vs JS утга | `" "` = яг энэ үг, `{ }` = хувьсагчийн утга |

---

## 🔁 `.map()` бичиглэлийн хувилбарууд

| | Бичиглэл | Хэзээ |
|---|---|---|
| **A** | `arr.map((item) => ( <li key={item.id}>{item.title}</li> ))` | Энгийн, анхан шат |
| **B** ⭐ | `arr.map(({ id, title }) => ( <li key={id}>{title}</li> ))` | 2–3 талбар авах. **Мэргэжлийн үндсэн сонголт** |
| **C** | `arr.map((item) => { const x = ...; return (...); })` | JSX-ээс **өмнө тооцоо** хийх үед (огноо таслах, тоо тоймлох, `if`) |

- **Шийдэх асуулт:** "Өгөгдлийг байгаагаар нь харуулах уу, эсвэл өмнө нь хувиргах уу?" → байгаагаар = A/B, хувиргах = C
- ⚠️ `{ }` нээгээд `return` мартвал **юу ч гарахгүй**
- **Object-д** = элемент бүрт **өөр** зүйл (`name`, `href`). **JSX-д** = бүгдэд **ижил** зүйл (`target`, `rel`, `className`)

---

## 📌 Төслийн дүрэм (нэмэгдсэн)

- Өнгөт хайрцгийн **дотор** зай → `padding`. Хайрцгуудыг **холдуулах** → эцэг дээр `gap`
- Ах дүү хайрцгуудын зайг **эцэг** удирдана (`flex flex-col gap-*`), хүүхэд бүрт `pb-*` тавихгүй
- Давхарлах → `relative` + `absolute`. Зэрэгцүүлэх → `flex` + `gap`
- `size-*`-ийг **icon өөр дээр нь** өгнө (wrapper div-д биш)
- Нэг хуудсанд `<h1>` **ганц**. Footer/хэсгийн гарчиг → `<h3>`
- Гадаад холбоос → `<a href target="_blank" rel="noopener noreferrer">`
- Давтагдсан JSX → **array + `.map()`**. Тогтмол өгөгдөл component-ын **гадна**, `UPPER_SNAKE_CASE`
- `.map()` → **B (destructuring)** бичиглэл. `key` заавал, index биш
- className-д илүүдэл зай, давхар зай үлдээхгүй

---

## ❌ Алдаа гаргаад сурсан зүйл

- **`text-white-700`** → Tailwind-д `white`-д тоо байхгүй, юу ч хийхгүй
- **`h-10` түгжсэн өндөр + `pb-6`** → агуулга халиж Email/Phone давхцсан
- **`size 4`** (зайтай) → `size-4`
- **`{" "}`** илүүдэл → устгах
- **`SOCAIL_LINKS`** бичгийн алдаа → "is not defined" алдаа гарна
- **`link` key** → `link.link` болж ойлгомжгүй. Attribute-тай ижил нэр (`href`) өгөх
- **`{link.href}`-ийг `<a>`-ийн хооронд** бичсэн → хаяг текст болж харагдсан, дарахад юу ч болоогүй
- **`.map()` хийхдээ `target`, `rel` мартагдсан**
- **`href="link.href"`** → хашилт = хатуу текст. JS утга бол `{ }`

---

## ⏭️ Дараагийн алхам (Алхам 4)

1. [ ] **Home хуудас** — Hero (Now Playing carousel), Upcoming / Popular / Top Rated жагсаалт
2. [ ] **MovieCard** component (`.map()`-аа кинон дээр хэрэглэнэ!)
3. Хойшлуулсан: Header-ийн **ажиллагаа** (Genre dropdown, хайлт, dark mode), **responsive** (утас)

**Санал болгох чатын нэр:** `Step 4 — Home page`
