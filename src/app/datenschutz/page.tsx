export default function DatenschutzPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
        <h1 className="font-display text-5xl uppercase tracking-wide">Datenschutz</h1>
        <p className="mt-2 text-amber-100/70">Privacy Policy</p>
      </div>

      <div className="rounded-3xl border border-black/15 bg-white/70 p-8 space-y-6 text-stone-700 text-sm">
        <section>
          <h2 className="font-semibold text-stone-900 text-base">1. Controller</h2>
          <div className="mt-2 space-y-1">
            <p>Philip Bennett – Punk Leadership, 94 Kastanienallee, 10435 Berlin, Germany</p>
            <p>Email: gary@metisio.com (operated by Gary Botlington IV, AI Agent)</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 text-base">2. Hosting & Infrastructure</h2>
          <p className="mt-2">
            This website is hosted by Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA). Vercel processes
            server logs including IP addresses for technical operation. See{" "}
            <a href="https://vercel.com/legal/privacy-policy" className="underline" target="_blank" rel="noopener noreferrer">
              Vercel Privacy Policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 text-base">3. Analytics — Fathom</h2>
          <div className="mt-2 space-y-2">
            <p>
              We use Fathom Analytics (Conva Ventures Inc., PO Box 3011, Charlottetown, PEI, Canada) to understand
              site traffic. Fathom does not use cookies and does not collect personal data or track you across websites.
              It is fully GDPR compliant without requiring a consent banner.
            </p>
            <p>
              Data collected: page views, referrer (anonymised), browser type. No IP addresses stored. No cross-site tracking.
            </p>
            <p>
              Legal basis: Article 6(1)(f) GDPR — legitimate interest in understanding aggregate site usage.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 text-base">4. Payment Processing — Stripe</h2>
          <div className="mt-2 space-y-2">
            <p>
              Payments are processed by Stripe Payments Europe, Ltd. (1 Grand Canal Street Lower, Grand Canal Dock,
              Dublin, D02 H210, Ireland). When you make a purchase, Stripe collects and processes your payment card
              data, email address, and billing address.
            </p>
            <p>
              We receive from Stripe: your email address and confirmation that payment was successful. We do not store
              your card details.
            </p>
            <p>
              Legal basis: Article 6(1)(b) GDPR — performance of a contract. See{" "}
              <a href="https://stripe.com/en-de/privacy" className="underline" target="_blank" rel="noopener noreferrer">
                Stripe Privacy Policy
              </a>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 text-base">5. Purchase Records</h2>
          <p className="mt-2">
            We retain transaction records (email address, purchase date, amount) as required by German commercial law
            (§257 HGB) for 10 years. This data is not used for marketing without your explicit consent.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 text-base">6. Your Rights</h2>
          <div className="mt-2 space-y-1">
            <p>Under GDPR Articles 15–22, you have the right to:</p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>Access personal data we hold about you</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data (where legally permitted)</li>
              <li>Objection to processing</li>
              <li>Data portability</li>
              <li>Lodge a complaint with the Berlin data protection authority (Berliner Beauftragte für Datenschutz und Informationsfreiheit)</li>
            </ul>
            <p className="mt-2">To exercise your rights: gary@metisio.com</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 text-base">7. Cookies</h2>
          <p className="mt-2">
            This website does not use cookies. Fathom Analytics operates without cookies. Stripe may set cookies on
            their checkout pages (stripe.com), which are governed by their own privacy policy.
          </p>
        </section>

        <p className="text-stone-400 pt-4">Last updated: March 2026</p>
      </div>
    </div>
  );
}
