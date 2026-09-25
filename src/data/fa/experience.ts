import type { Experience } from "@/types/content";

/**
 * از جدید به قدیم. تاریخ‌ها با ارقام لاتین نوشته می‌شوند و هنگام نمایش به فارسی تبدیل می‌شوند.
 * فقط دستاوردهای قابل اثبات را با عدد بنویسید.
 * TODO(sina): جزئیات واقعی هر نقش را کامل کنید.
 */
export const experience: Experience[] = [
  {
    companyId: "caspian",
    title: "توسعه‌دهنده Backend جاوا",
    start: "2025",
    end: null,
    summary: "توسعه Backend سامانه‌های سازمانی و بانکی.",
    highlights: [
      "توسعه سامانه‌های سازمانی و بانکی",
      "توسعه Backend با Java و Spring Boot",
      "نوسازی و مهاجرت سامانه‌های قدیمی",
      "پیاده‌سازی و نگهداری پردازش‌های Batch",
      "توسعه سرویس‌های داخلی",
    ],
    technologies: ["Java", "Spring Boot"],
  },
  {
    companyId: "dotin",
    title: "توسعه‌دهنده جاوا",
    start: "2022",
    end: "2025",
    summary: "توسعه Backend نرم‌افزارهای بانکی.",
    highlights: [
      "توسعه نرم‌افزارهای بانکی",
      "توسعه سرویس‌های Backend",
      "طراحی و پیاده‌سازی REST API",
      "کار روی سامانه‌های سازمانی",
    ],
    technologies: ["Java", "REST API"],
  },
  {
    companyId: "tarsim",
    title: "توسعه‌دهنده جاوا",
    start: "2021",
    end: "2022",
    summary: "شروع مسیر حرفه‌ای به‌صورت کارآموز و ادامه در نقش توسعه‌دهنده نرم‌افزار.",
    highlights: [
      "شروع همکاری به‌عنوان کارآموز و ادامه در نقش توسعه‌دهنده نرم‌افزار",
      "توسعه و نگهداری برنامه‌های مبتنی بر Java",
    ],
    technologies: ["Java"],
  },
];
