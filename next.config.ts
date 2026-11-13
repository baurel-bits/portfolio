import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const headers = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    // Les déploiements de prévisualisation Vercel ne doivent pas être indexés.
    if (process.env.VERCEL_ENV === "preview") {
      headers.push({ key: "X-Robots-Tag", value: "noindex" });
    }

    return [{ source: "/:path*", headers }];
  },
  // La redirection de `/` vers la langue du navigateur est gérée dans
  // `src/proxy.ts`, seul endroit où l'en-tête `Accept-Language` est lisible.
};

export default nextConfig;
