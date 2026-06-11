export type ServiceCategory = "statistical_analysis" | "ai_consulting";

export interface ServiceItem {
  slug: string;
  category: ServiceCategory;
  title: string;
  shortDescription: string;
  features: string[];
}

export const serviceCategories: Record<
  ServiceCategory,
  { title: string; description: string }
> = {
  statistical_analysis: {
    title: "تحلیل آماری و مدل‌یابی معادلات ساختاری (SEM)",
    description:
      "تحلیل داده‌های پژوهشی با SPSS، Amos و Lisrel — از آمار توصیفی تا مدل‌یابی معادلات ساختاری، با گزارشی شفاف و قابل دفاع.",
  },
  ai_consulting: {
    title: "مشاوره و آموزش هوش مصنوعی",
    description:
      "استفاده هوشمندانه و معتبر از هوش مصنوعی در فرآیند پژوهش — از مرور ادبیات تا نگارش، با رویکردی مبتنی بر شواهد.",
  },
};

export const services: ServiceItem[] = [
  {
    slug: "thesis-statistical-analysis",
    category: "statistical_analysis",
    title: "تحلیل آماری پایان‌نامه و مقاله",
    shortDescription:
      "آمار توصیفی و استنباطی با SPSS، همراه با گزارش کامل و تفسیر نتایج برای فصل چهارم.",
    features: [
      "تحلیل داده با SPSS متناسب با فرضیه‌ها و سوالات پژوهش",
      "گزارش خروجی‌ها همراه با تفسیر علمی و قابل دفاع",
      "راهنمایی برای نگارش بخش یافته‌ها",
    ],
  },
  {
    slug: "sem-modeling",
    category: "statistical_analysis",
    title: "مدل‌یابی معادلات ساختاری (SEM)",
    shortDescription:
      "طراحی، برازش و تفسیر مدل SEM با Amos یا Lisrel — همراه با راهنمای گام‌به‌گام برای دفاع.",
    features: [
      "طراحی مدل اندازه‌گیری و ساختاری متناسب با چارچوب نظری",
      "بررسی شاخص‌های برازش (CFI، RMSEA و...) و اصلاح مدل",
      "تفسیر خروجی به زبان ساده و آماده‌سازی برای جلسه دفاع",
    ],
  },
  {
    slug: "software-coaching",
    category: "statistical_analysis",
    title: "آموزش خصوصی SPSS / Amos / Lisrel",
    shortDescription:
      "جلسات یک‌به‌یک برای یادگیری کاربردی نرم‌افزارهای آماری، متناسب با پروژه شما.",
    features: [
      "آموزش گام‌به‌گام بر اساس داده‌های واقعی پروژه شما",
      "رفع گیر‌های رایج (خطاهای مدل، عدم برازش و...)",
      "مناسب برای دانشجویانی که می‌خواهند خودشان تحلیل را انجام دهند",
    ],
  },
  {
    slug: "ai-research-consulting",
    category: "ai_consulting",
    title: "مشاوره استفاده از AI در پژوهش",
    shortDescription:
      "به‌کارگیری معتبر و قابل دفاع هوش مصنوعی در مرور ادبیات، نگارش و تحلیل پژوهش.",
    features: [
      "راهنمایی برای استفاده اخلاقی و معتبر از AI در پژوهش علمی",
      "کمک به مرور ادبیات و سازمان‌دهی منابع با ابزارهای AI",
      "بازبینی و ویرایش محتوای تولیدشده با AI",
    ],
  },
  {
    slug: "ai-workshop",
    category: "ai_consulting",
    title: "ورکشاپ کاربرد AI برای پژوهشگران",
    shortDescription:
      "کارگاه آموزشی برای دانشجویان و اعضای هیئت علمی روان‌شناسی و علوم تربیتی.",
    features: [
      "آشنایی با ابزارهای کاربردی AI در پژوهش‌های علوم انسانی",
      "تمرین عملی روی پروژه‌های واقعی شرکت‌کنندگان",
      "قابل برگزاری به صورت آنلاین برای گروه‌ها و دانشگاه‌ها",
    ],
  },
  {
    slug: "ai-strategy",
    category: "ai_consulting",
    title: "مشاوره و پیاده‌سازی AI برای کسب‌وکار",
    shortDescription:
      "استراتژی و پیاده‌سازی هوش مصنوعی برای افراد و سازمان‌ها.",
    features: [
      "بررسی نیازها و فرصت‌های استفاده از AI در فرآیندها",
      "پیشنهاد ابزارها و راهکارهای متناسب",
      "همراهی در مراحل اولیه پیاده‌سازی",
    ],
  },
];
