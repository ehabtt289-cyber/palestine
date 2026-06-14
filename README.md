# 🇵🇸 Roots of Palestine

> An interactive cinematic documentary website telling Palestine's history, culture, and figures in three languages.
>
> موقع وثائقي تفاعلي يروي تاريخ فلسطين وثقافتها وشخصياتها بثلاث لغات سينمائياً.

---

## 🇬🇧 English

### 📖 Description
**Roots of Palestine** is a fully responsive, cinematic documentary web app that presents the history, cities, culture, statistics, and iconic figures of Palestine. It supports **Arabic, English, and French** with automatic RTL handling, smooth Framer Motion animations, an interactive map, a historical timeline, and detailed biographies.

### ✨ Features
- Cinematic design with smooth Framer Motion animations
- 3 languages (AR / EN / FR) with automatic RTL
- Interactive map of Palestinian cities
- Important figures with **"Learn More"** dialogs and full biographies
- Interactive historical timeline with expanded details
- Culture page (food, art, heritage, keffiyeh, Nabulsi knafeh...)
- Animated statistics (count-up)
- Wikimedia Commons images + static fallback bundled in code
- 100% responsive (Mobile / Tablet / Desktop)
- SEO ready (meta tags, OG, sitemap, robots)
- Pure frontend — no backend required

### 🛠️ Tech Stack
| Category | Libraries |
|----------|-----------|
| Framework | React 19, TanStack Start, TanStack Router |
| Build | Vite 7 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui, Radix UI |
| Animation | Framer Motion |
| Icons | Lucide React |
| i18n | Custom (AR / EN / FR) |

### 🚀 Run Locally
```bash
# 1) Install dependencies
bun install
# or: npm install

# 2) Start dev server
bun run dev

# 3) Build for production
bun run build

# 4) Preview production build
bun run preview
```
Then open: <http://localhost:5173>

### 📁 Project Structure
```
src/
├── routes/      # Pages (file-based routing)
├── components/  # UI + Layout + Motion + Media
├── data/        # Static JSON (figures, events, cities, culture)
├── i18n/        # Translations (ar / en / fr)
├── hooks/       # Custom hooks
├── services/    # Wikimedia API
└── styles.css   # Tailwind + Design Tokens
```

### 📜 License
Historical content and images are sourced from **Wikimedia Commons** under free licenses (CC). The code is open source — use it freely to serve the Palestinian cause. 🇵🇸

---

## 🇸🇦 العربية

### 📖 الوصف
**Roots of Palestine** موقع وثائقي سينمائي متكامل ومتجاوب يعرض تاريخ فلسطين ومدنها وثقافتها وإحصائياتها وأبرز شخصياتها. يدعم **العربية والإنجليزية والفرنسية** مع RTL تلقائي وحركات Framer Motion سلسة وخريطة تفاعلية وخط زمني تاريخي وسير ذاتية مفصّلة.

### ✨ المميزات
- 🎬 تصميم سينمائي مع حركات Framer Motion سلسة
- 🌍 دعم 3 لغات (AR / EN / FR) مع RTL تلقائي
- 🗺️ خريطة تفاعلية للمدن الفلسطينية
- 👤 شخصيات بارزة مع زر **"اعرف المزيد"** وسير ذاتية مفصّلة
- 📅 خط زمني تفاعلي مع تفاصيل موسّعة
- 🎨 صفحة ثقافة (طعام، فن، تراث، كوفية، كنافة نابلسية...)
- 📊 إحصائيات مع عدّاد متحرك
- 🖼️ صور من Wikimedia Commons + Fallback ثابت داخل الكود
- 📱 تصميم متجاوب 100% (موبايل / تابلت / ديسكتوب)
- 🔍 جاهز للـ SEO (Meta tags, OG, Sitemap, Robots)
- ⚡ Frontend فقط — بدون أي Backend

### 🛠️ التقنيات
| الفئة | المكتبات |
|------|---------|
| Framework | React 19, TanStack Start, TanStack Router |
| Build | Vite 7 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui, Radix UI |
| Animation | Framer Motion |
| Icons | Lucide React |
| i18n | Custom (AR / EN / FR) |

### 🚀 التشغيل المحلي
```bash
# 1) تثبيت الحزم
bun install
# أو: npm install

# 2) تشغيل التطوير
bun run dev

# 3) بناء الإنتاج
bun run build

# 4) معاينة البناء
bun run preview
```
ثم افتح: <http://localhost:5173>

### 📁 هيكل المشروع
```
src/
├── routes/      # صفحات الموقع (file-based routing)
├── components/  # UI + Layout + Motion + Media
├── data/        # JSON ثابت (شخصيات، أحداث، مدن، ثقافة)
├── i18n/        # ترجمات (ar / en / fr)
├── hooks/       # Hooks مخصصة
├── services/    # Wikimedia API
└── styles.css   # Tailwind + Design Tokens
```

### 📜 الترخيص
المحتوى التاريخي والصور من **Wikimedia Commons** تحت تراخيص حرة (CC). الكود مفتوح المصدر — استخدمه بحرّية لخدمة القضية الفلسطينية. 🇵🇸

> **"على هذه الأرض ما يستحق الحياة" — محمود درويش**
