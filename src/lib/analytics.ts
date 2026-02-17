/**
 * Lightweight analytics utility that forwards events to whichever
 * third-party provider is loaded on the page (Plausible, PostHog, or GA4).
 *
 * Falls back to console.debug in development. No-op in production when
 * no provider is configured.
 */

// ---------------------------------------------------------------------------
// Key event constants
// ---------------------------------------------------------------------------

export const EVENTS = {
  LESSON_COMPLETED: "lesson_completed",
  COURSE_ENROLLED: "course_enrolled",
  DAILY_CHALLENGE_COMPLETED: "daily_challenge_completed",
  ACHIEVEMENT_UNLOCKED: "achievement_unlocked",
  STREAK_MILESTONE: "streak_milestone",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

// ---------------------------------------------------------------------------
// Provider type declarations (only what we need to call into them)
// ---------------------------------------------------------------------------

type EventProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: EventProperties },
    ) => void;
    posthog?: {
      capture: (event: string, properties?: EventProperties) => void;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const isDev =
  typeof process !== "undefined" && process.env.NODE_ENV === "development";

function hasProvider(): boolean {
  if (typeof window === "undefined") return false;
  return !!(window.plausible || window.posthog || window.gtag);
}

function forwardEvent(name: string, properties?: EventProperties): void {
  if (typeof window === "undefined") return;

  // Plausible
  if (window.plausible) {
    window.plausible(name, properties ? { props: properties } : undefined);
  }

  // PostHog
  if (window.posthog) {
    window.posthog.capture(name, properties);
  }

  // Google Analytics 4
  if (window.gtag) {
    window.gtag("event", name, properties);
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Track a named event with optional properties.
 *
 * Forwards to every detected provider. In development mode, falls back to
 * `console.debug` so events are visible during local testing. In production
 * the call is a no-op when no provider script is present.
 */
export function trackEvent(
  name: string,
  properties?: EventProperties,
): void {
  if (typeof window === "undefined") return;

  if (hasProvider()) {
    forwardEvent(name, properties);
    return;
  }

  if (isDev) {
    console.debug("[analytics]", name, properties ?? "");
  }
}

/**
 * Track a page view for the given path.
 *
 * Uses each provider's conventional page-view mechanism when available.
 */
export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;

  if (typeof window.plausible === "function") {
    window.plausible("pageview");
  }

  if (window.posthog) {
    window.posthog.capture("$pageview", { path });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: path });
  }

  if (!hasProvider() && isDev) {
    console.debug("[analytics] pageview", path);
  }
}
