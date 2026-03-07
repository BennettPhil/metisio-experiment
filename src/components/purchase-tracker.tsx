"use client";
import { useEffect } from "react";
import { trackPurchaseCompleted } from "@/components/fathom";

export function PurchaseTracker() {
  useEffect(() => {
    trackPurchaseCompleted();
  }, []);
  return null;
}
