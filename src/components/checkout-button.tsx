"use client";
import { useRouter } from "next/navigation";
import { trackCheckoutClick } from "@/components/fathom";

export function CheckoutButton({ label = "[ INITIATE AUDIT — €20 ]", className = "" }: { label?: string; className?: string }) {
  const router = useRouter();
  return (
    <button
      className={`terminal-button px-4 py-2 ${className}`}
      onClick={() => {
        trackCheckoutClick();
        router.push("/checkout");
      }}
    >
      {label}
    </button>
  );
}
