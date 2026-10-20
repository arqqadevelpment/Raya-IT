"use client";

import { useState } from "react";
import { inquiryTopics } from "@/lib/site-map";

const field =
  "mt-1.5 w-full rounded-md border border-grey/60 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-electric focus:outline-none";

export default function InquiryForm({ defaultTopic = "" }: { defaultTopic?: string }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="rounded-lg bg-surface p-8">
        <h3 className="text-xl font-bold text-navy">Thank you</h3>
        <p className="mt-2 text-ink/70">Your inquiry has been received. We will answer you shortly.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to the inquiry/ticketing backend.
        setSent(true);
      }}
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
    >
      <label className="text-sm font-medium text-navy">
        Full name
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="text-sm font-medium text-navy">
        Company
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="text-sm font-medium text-navy">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="text-sm font-medium text-navy">
        Phone
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="text-sm font-medium text-navy sm:col-span-2 lg:col-span-4">
        Solution / Service
        <select name="topic" defaultValue={defaultTopic} className={field}>
          <option value="">General inquiry</option>
          {inquiryTopics.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <label className="text-sm font-medium text-navy sm:col-span-2 lg:col-span-4">
        Message
        <textarea name="message" required rows={5} className={field} />
      </label>
      <div className="sm:col-span-2 lg:col-span-4">
        <button
          type="submit"
          className="rounded-full bg-electric px-7 py-3 text-sm font-semibold text-white hover:bg-blue"
        >
          Send inquiry
        </button>
      </div>
    </form>
  );
}
