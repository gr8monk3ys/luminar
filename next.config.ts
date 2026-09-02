import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // @gr8monk3ys/next-kit ships its ESM entry as TypeScript source, so Next has
  // to compile it rather than treat it as a prebuilt dependency.
  transpilePackages: ["@gr8monk3ys/next-kit"],
};

// Only wrap with Sentry if DSN is configured
const hasSentry = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

export default hasSentry
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: true,
      widenClientFileUpload: true,
      disableLogger: true,
    })
  : nextConfig;
