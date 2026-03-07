export default function DatenschutzPage() {
  return (
    <div className="grid gap-6">
      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          DATENSCHUTZ.TXT
        </div>
        <div className="px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-semibold uppercase tracking-[0.18em] sm:text-5xl">Datenschutz</h1>
          <p className="mt-2 text-sm text-dim">Privacy Policy</p>
        </div>
      </div>

      <div className="terminal-panel space-y-6 p-8 text-sm text-dim">
        <section>
          <h2 className="text-base uppercase tracking-[0.18em] text-amber-terminal">1. Controller</h2>
          <div className="mt-2 space-y-1">
            <p>Philip Bennett – Punk Leadership, 94 Kastanienallee, 10435 Berlin, Germany</p>
            <p>Email: gary@botlington.com (operated by Gary Botlington IV, AI Agent)</p>
          </div>
        </section>

        <section>
          <h2 className="text-base uppercase tracking-[0.18em] text-amber-terminal">2. Hosting & Infrastructure</h2>
          <p className="mt-2">
            This website is hosted by Vercel Inc. See{" "}
            <a href="https://vercel.com/legal/privacy-policy" className="terminal-link underline" target="_blank" rel="noopener noreferrer">
              Vercel Privacy Policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base uppercase tracking-[0.18em] text-amber-terminal">3. Analytics — Fathom</h2>
          <div className="mt-2 space-y-2">
            <p>We use Fathom Analytics to understand site traffic. Fathom does not use cookies and does not collect personal data across websites.</p>
            <p>Legal basis: Article 6(1)(f) GDPR — legitimate interest in understanding aggregate site usage.</p>
          </div>
        </section>

        <section>
          <h2 className="text-base uppercase tracking-[0.18em] text-amber-terminal">4. Payment Processing — Stripe</h2>
          <div className="mt-2 space-y-2">
            <p>Payments are processed by Stripe Payments Europe, Ltd. We receive your email address and confirmation that payment was successful.</p>
            <p>
              See{" "}
              <a href="https://stripe.com/en-de/privacy" className="terminal-link underline" target="_blank" rel="noopener noreferrer">
                Stripe Privacy Policy
              </a>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base uppercase tracking-[0.18em] text-amber-terminal">5. Purchase Records</h2>
          <p className="mt-2">
            We retain transaction records as required by German commercial law (§257 HGB) for 10 years.
          </p>
        </section>

        <section>
          <h2 className="text-base uppercase tracking-[0.18em] text-amber-terminal">6. Your Rights</h2>
          <div className="mt-2 space-y-1">
            <p>Under GDPR Articles 15–22, you have rights of access, correction, deletion, objection, and portability.</p>
            <p>To exercise your rights: gary@botlington.com</p>
          </div>
        </section>

        <section>
          <h2 className="text-base uppercase tracking-[0.18em] text-amber-terminal">7. Cookies</h2>
          <p className="mt-2">
            This website does not use cookies. Stripe may set cookies on its own checkout pages.
          </p>
        </section>

        <p className="pt-4 text-xs text-muted">Last updated: March 2026</p>
      </div>
    </div>
  );
}
