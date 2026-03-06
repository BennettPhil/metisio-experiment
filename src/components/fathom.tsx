"use client";

import { load, trackPageview } from "fathom-client";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TrackPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    load("MXRQYUNQ", {
      includedDomains: ["www.metisio.com", "metisio.com"],
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
