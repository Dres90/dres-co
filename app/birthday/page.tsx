import type { Metadata } from "next";
import Image from "next/image";

import {
  getDictionaryValue,
  getDictionaryValues,
  interpolateDictionaryValue,
} from "@/lib/dictionary";
import { createAdminClient } from "@/utils/supabase/admin";

const BUCKET = "dres-co-public";

/** Always read fresh data from Supabase (imports can happen after deploy). */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: await getDictionaryValue("birthday.meta.title"),
    robots: { index: false, follow: false },
  };
}

type BirthdayMessageRow = {
  id: string;
  author_name: string;
  body: string;
  image_path: string | null;
  video_path: string | null;
  submitted_at: string;
};

export default async function BirthdayPage() {
  const dictionary = await getDictionaryValues([
    "birthday.page.title",
    "birthday.state.unavailable_missing_env",
    "birthday.state.load_error",
    "birthday.hero.kicker",
    "birthday.summary.empty",
    "birthday.summary.count",
  ]);

  const supabase = createAdminClient();
  if (!supabase) {
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-rose-900">
          {dictionary["birthday.page.title"]}
        </h1>
        <p className="rounded-2xl bg-white/70 px-6 py-4 text-stone-600 shadow-md ring-1 ring-amber-100/80">
          {dictionary["birthday.state.unavailable_missing_env"]}
        </p>
      </div>
    );
  }

  const { data, error } = await supabase
    .from("birthday_messages")
    .select("id, author_name, body, image_path, video_path, submitted_at")
    .order("submitted_at", { ascending: true });

  if (error) {
    console.error("[birthday]", error.message);
    return (
      <div className="mx-auto max-w-lg space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-rose-900">
          {dictionary["birthday.page.title"]}
        </h1>
        <p className="rounded-2xl bg-white/70 px-6 py-4 text-stone-600 shadow-md ring-1 ring-amber-100/80">
          {dictionary["birthday.state.load_error"]}
        </p>
      </div>
    );
  }

  const messages = (data ?? []) as BirthdayMessageRow[];

  return (
    <div className="mx-auto w-full max-w-6xl flex-1">
      <header className="mb-10 text-center sm:mb-14">
        <p className="mb-2 text-lg text-rose-600/90 sm:text-xl">
          {dictionary["birthday.hero.kicker"]}
        </p>
        <h1 className="bg-gradient-to-r from-rose-600 via-amber-600 to-sky-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl md:text-5xl">
          {dictionary["birthday.page.title"]}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-stone-600 sm:text-lg">
          {messages.length === 0
            ? dictionary["birthday.summary.empty"]
            : interpolateDictionaryValue(dictionary["birthday.summary.count"], {
                count: messages.length,
              })}
        </p>
        <div className="mt-6 flex justify-center gap-2 text-2xl" aria-hidden>
          <span
            className="motion-safe:animate-bounce"
            style={{ animationDelay: "0ms" }}
          >
            🎂
          </span>
          <span
            className="motion-safe:animate-bounce"
            style={{ animationDelay: "100ms" }}
          >
            ✨
          </span>
          <span
            className="motion-safe:animate-bounce"
            style={{ animationDelay: "200ms" }}
          >
            💛
          </span>
        </div>
      </header>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {messages.map((msg, index) => {
          const imageUrl = msg.image_path
            ? supabase.storage.from(BUCKET).getPublicUrl(msg.image_path).data.publicUrl
            : null;
          const videoUrl = msg.video_path
            ? supabase.storage.from(BUCKET).getPublicUrl(msg.video_path).data.publicUrl
            : null;

          const accents = [
            "from-amber-50 to-orange-50/80 ring-amber-200/60",
            "from-rose-50 to-pink-50/80 ring-rose-200/60",
            "from-sky-50 to-cyan-50/80 ring-sky-200/60",
            "from-violet-50 to-purple-50/70 ring-violet-200/50",
          ];
          const accent = accents[index % accents.length];

          return (
            <li key={msg.id}>
              <article
                className={`flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${accent} p-6 shadow-lg ring-1 transition-shadow duration-300 hover:shadow-xl sm:p-7`}
              >
                <header className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold leading-snug text-rose-900 sm:text-xl">
                    {msg.author_name}
                  </h2>
                  <span
                    className="shrink-0 rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-amber-800 shadow-sm ring-1 ring-amber-200/50"
                    aria-hidden
                  >
                    ♥
                  </span>
                </header>

                <div className="min-h-0 flex-1 whitespace-pre-wrap text-[15px] leading-relaxed text-stone-700 sm:text-base">
                  {msg.body}
                </div>

                {imageUrl ? (
                  <figure className="mt-5 overflow-hidden rounded-2xl bg-white/60 shadow-inner ring-1 ring-white/80">
                    <Image
                      src={imageUrl}
                      alt=""
                      width={2048}
                      height={2048}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </figure>
                ) : null}

                {videoUrl ? (
                  <div className="mt-5 overflow-hidden rounded-2xl bg-stone-900/5 ring-1 ring-stone-200/60">
                    <video
                      className="aspect-video w-full bg-black/5"
                      controls
                      playsInline
                      preload="metadata"
                    >
                      <source src={videoUrl} />
                    </video>
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
