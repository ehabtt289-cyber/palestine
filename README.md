# 🇵🇸 Roots of Palestine — موقع وثائقي تفاعلي عن فلسطين

> **وصف الموقع (12 كلمة):**
> موقع وثائقي تفاعلي يروي تاريخ فلسطين وثقافتها وشخصياتها بثلاث لغات سينمائياً.

موقع وثائقي احترافي مبني بـ **React + TypeScript + Vite + TanStack Start** يعرض تاريخ فلسطين، مدنها، شخصياتها، ثقافتها وإحصائياتها بأسلوب سينمائي تفاعلي، مع دعم كامل للعربية والإنجليزية والفرنسية.

---

## ✨ المميزات

- 🎬 تصميم سينمائي مع حركات Framer Motion سلسة
- 🌍 دعم 3 لغات (AR / EN / FR) مع RTL تلقائي
- 🗺️ خريطة تفاعلية للمدن الفلسطينية
- 👤 شخصيات بارزة مع زر "اعرف المزيد" وسير ذاتية مفصّلة
- 📅 خط زمني تفاعلي للأحداث التاريخية
- 🎨 صفحة ثقافة (طعام، فن، تراث، كوفية، كنافة نابلسية...)
- 📊 إحصائيات مع عدّاد متحرك (Count-up)
- 🖼️ صور من Wikimedia Commons + Fallback ثابت داخل المشروع
- 📱 تصميم متجاوب 100% (Mobile / Tablet / Desktop)
- 🔍 SEO جاهز (Meta tags, OG, Sitemap, Robots)
- ⚡ بدون أي Backend — Frontend فقط

---

## 🛠️ التقنيات

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

---

## 🚀 التشغيل المحلي

```bash
# 1) تثبيت الحزم
bun install
# أو npm install

# 2) تشغيل التطوير
bun run dev

# 3) بناء الإنتاج
bun run build

# 4) معاينة البناء
bun run preview
```

ثم افتح: <http://localhost:5173>

---

## 📁 هيكل المشروع

```
src/
├── routes/          # صفحات الموقع (file-based routing)
│   ├── __root.tsx   # الـ Layout الرئيسي
│   ├── index.tsx    # الصفحة الرئيسية
│   ├── timeline.tsx # الخط الزمني
│   ├── figures.tsx  # الشخصيات
│   ├── culture.tsx  # الثقافة
│   ├── map.tsx      # الخريطة
│   ├── gallery.tsx  # المعرض
│   ├── statistics.tsx
│   └── about.tsx
├── components/      # UI + Layout + Motion + Media
├── data/            # JSON ثابت (شخصيات، أحداث، مدن، ثقافة)
├── i18n/            # ترجمات (ar / en / fr)
├── hooks/           # Hooks مخصصة
├── services/        # Wikimedia API
└── styles.css       # Tailwind + Design Tokens
```

---

## 📤 رفع المشروع إلى GitHub

### ✅ نعم، يمكن رفع المشروع من Lovable إلى GitHub مباشرة!

الطريقة من داخل Lovable:

1. اضغط على زر **(+)** أسفل يسار محرر الشات
2. اختر **GitHub → Connect project**
3. وافق على تثبيت **Lovable GitHub App**
4. اختر الحساب / المنظمة
5. اضغط **Create Repository**

بعدها أي تعديل في Lovable سيتم رفعه تلقائياً إلى GitHub (Two-way sync)، وأي Push على GitHub سيظهر فوراً في Lovable.

### الطريقة اليدوية (إذا حملت ZIP)

```bash
git init
git add .
git commit -m "Initial commit: Roots of Palestine"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

---

## 🌐 الموقع المنشور

- Preview: <https://id-preview--a9a2bccc-3487-4faa-9d42-ee80393922a3.lovable.app>
- Live: <https://roots-of-palestine.lovable.app>

---

## 📜 الترخيص

المحتوى التاريخي والصور من **Wikimedia Commons** تحت تراخيص حرة (CC).
الكود مفتوح المصدر — استخدمه بحرّية لخدمة القضية الفلسطينية. 🇵🇸

> **"على هذه الأرض ما يستحق الحياة" — محمود درويش**
