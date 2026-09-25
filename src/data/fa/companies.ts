import type { Company } from "@/types/content";

/**
 * شرکت‌ها از طریق `id` در `experience` ارجاع داده می‌شوند. نام شرکت‌ها به شکل رسمی باقی می‌ماند.
 * TODO(sina): در صورت تمایل آدرس وب‌سایت شرکت‌ها را اضافه کنید.
 */
export const companies: Company[] = [
  { id: "caspian", name: "Caspian", url: "", industry: "سامانه‌های سازمانی و بانکی" },
  { id: "dotin", name: "Dotin", url: "", industry: "نرم‌افزارهای بانکی" },
  { id: "tarsim", name: "Tarsim", url: "", industry: "توسعه نرم‌افزار" },
];
