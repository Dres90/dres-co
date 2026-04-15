export const SITE_NAME = "Andres Cardenas";

export const SITE_DESCRIPTION =
  "Full stack engineer with 10+ years of experience. Tech lead and software architecture across client platforms, research tooling, and ecommerce.";

export const LINKEDIN_URL = "https://www.linkedin.com/in/dres90/";

export const EMAIL_PRIMARY = "andres@dres.co";

export const EMAIL_ALT = "acardenas90@gmail.com";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export function showLabsNav(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_LABS !== "false";
}
