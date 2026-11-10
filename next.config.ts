import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A stray lockfile higher up the
  // filesystem (e.g. ~/package-lock.json) otherwise makes Next infer the wrong root.
  turbopack: {
    root: __dirname,
  },
  // Dev only: let phones and tablets on the local network load the dev server's
  // JS and HMR (e.g. http://192.168.1.53:3001). Next 16 blocks these by default,
  // which leaves the page unhydrated and every <Reveal> stuck at opacity 0.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  // Baked in at build time for the footer's "last deploy" line. Vercel provides
  // the commit SHA during builds; locally it's empty and the SHA is hidden.
  env: {
    NEXT_PUBLIC_DEPLOYED_AT: new Date().toISOString(),
    NEXT_PUBLIC_COMMIT_SHA: (process.env.VERCEL_GIT_COMMIT_SHA ?? "").slice(0, 7),
  },
};

export default nextConfig;
