import type { NextConfig } from "next";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseHost = (() => {
  if (!supabaseUrl) return null;
  try {
    return new URL(supabaseUrl).hostname;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/dres-co-public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
