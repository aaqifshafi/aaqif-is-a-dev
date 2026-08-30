import Script from "next/script";

/**
 * Cloudflare Web Analytics site token. Public by design — the beacon carries it
 * in the page markup on every request, and it only names which site a hit
 * belongs to. Rotate it from the Cloudflare dashboard, not by hiding it here.
 */
const BEACON_TOKEN = "de6c88d17ab6490798e7027bffe62a3c";

/**
 * Cloudflare Web Analytics beacon.
 *
 * `afterInteractive` keeps it off the hydration critical path. The beacon
 * reports Navigation Timing and Web Vitals, none of which it has to be present
 * at parse time to collect, and it hooks the History API itself — client-side
 * route changes are counted without wiring anything to the router.
 *
 * `type="module"` is kept from Cloudflare's own snippet, and it is what makes
 * the token lookup non-obvious: module scripts never set
 * `document.currentScript`. The beacon falls back to
 * `querySelector("script[data-cf-beacon]")`, which finds this tag and reads the
 * token off it — so it resolves whether the tag is server-rendered into the
 * HTML or re-registered by the Script component on hydration.
 *
 * Production only. Cloudflare answers a beacon from `http://localhost:3000`
 * with `access-control-allow-origin: http://localhost` — port dropped — so the
 * browser rejects it and every dev page load logs a failed POST. Skipping it
 * outright is the honest fix: local sessions are not traffic worth counting.
 */
export function CloudflareAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      type="module"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: BEACON_TOKEN })}
    />
  );
}
