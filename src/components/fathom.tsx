"use client";

import { load, trackPageview, trackEvent } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Fathom event tracking helpers — call these from any client component
export const trackCheckoutClick = () => trackEvent("checkout_initiated");
export const trackScoreCompleted = (score: number) => trackEvent(`score_completed_${score}`);
export const trackSampleAuditViewed = (slug: string) => trackEvent(`sample_audit_viewed_${slug}`);
export const trackPurchaseCompleted = () => trackEvent("purchase_completed");

function TrackPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    load("MXRQYUNQ", {
      includedDomains: ["www.botlington.com", "botlington.com"],
      auto: false,
    });
  }, []);

  useEffect(() => {
    trackPageview();
  }, [pathname, searchParams]);

  return null;
}

export function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageview />
    </Suspense>
  );
}
