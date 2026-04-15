import { getSiteUrl, LINKEDIN_URL, SITE_NAME } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    url: getSiteUrl(),
    sameAs: [LINKEDIN_URL],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
