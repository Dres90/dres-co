/** Match DB constraint `short_links_slug_format` / `short_links_slug_length`. */
const SLUG_MAX_LEN = 128;
const SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;

export function isValidShortSlug(slug: string): boolean {
  return slug.length > 0 && slug.length <= SLUG_MAX_LEN && SLUG_PATTERN.test(slug);
}

/** Only http(s) destinations — aligns with `short_links_url_scheme` in Supabase. */
export function isAllowedRedirectUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
