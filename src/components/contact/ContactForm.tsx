"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

const CONTACT_EMAIL = "dr.marziyefeizi@gmail.com";

const topics = [
  "تحلیل آماری پایان‌نامه/مقاله",
  "مدل‌یابی معادلات ساختاری (SEM)",
  "آموزش خصوصی SPSS/Amos/Lisrel",
  "مشاوره و آموزش هوش مصنوعی",
  "سایر موارد",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const topic = String(formData.get("topic") ?? "");
    const message = String(formData.get("message") ?? "");

    const subject = `درخواست مشاوره: ${topic}`;
    const body = `نام: ${name}\nایمیل: ${email}\nموضوع: ${topic}\n\nپیام:\n${message}`;

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            نام و نام خانوادگی
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-brand-charcoal"
          >
            ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="topic"
          className="mb-2 block text-sm font-semibold text-brand-charcoal"
        >
          موضوع درخواست
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue={topics[0]}
          className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-brand-charcoal"
        >
          توضیحات پروژه
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="کمی درباره پروژه، داده‌ها و سوالات پژوهش‌تان بنویسید..."
          className="w-full rounded-xl border border-brand-charcoal/15 bg-white px-4 py-3 text-sm text-brand-charcoal outline-none focus:border-brand-teal"
        />
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        ارسال پیام
      </Button>

      {submitted && (
        <p className="text-sm text-brand-teal">
          برنامه ایمیل شما باز می‌شود تا پیام را ارسال کنید. اگر چیزی باز
          نشد، می‌توانید مستقیماً به آدرس {CONTACT_EMAIL} ایمیل بزنید.
        </p>
      )}
    </form>
  );
}
