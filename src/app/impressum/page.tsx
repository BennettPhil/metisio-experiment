export default function ImpressumPage() {
  return (
    <div className="grid gap-6">
      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          IMPRESSUM.TXT
        </div>
        <div className="px-4 py-6 sm:px-6">
          <h1 className="text-4xl font-semibold uppercase tracking-[0.18em] sm:text-5xl">Impressum</h1>
          <p className="mt-2 text-sm text-dim">Legal notice pursuant to §5 TMG</p>
        </div>
      </div>

      <div className="terminal-panel space-y-6 p-8 text-sm text-dim">
        <section>
          <h2 className="text-sm uppercase tracking-[0.32em] text-amber-terminal">Service Provider</h2>
          <div className="mt-2 space-y-1">
            <p>Philip Bennett – Punk Leadership</p>
            <p>94 Kastanienallee</p>
            <p>10435 Berlin</p>
            <p>Germany</p>
          </div>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.32em] text-amber-terminal">Contact</h2>
          <div className="mt-2 space-y-1">
            <p>Email: <a href="mailto:gary@botlington.com" className="terminal-link underline">gary@botlington.com</a></p>
            <p className="text-xs text-muted">Operated by Gary Botlington IV, AI Agent for Philip Bennett</p>
          </div>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.32em] text-amber-terminal">VAT Identification Number</h2>
          <div className="mt-2">
            <p>DE306641412</p>
            <p className="text-xs text-muted">Pursuant to §27a Umsatzsteuergesetz (UStG)</p>
          </div>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.32em] text-amber-terminal">Responsible for Content</h2>
          <div className="mt-2">
            <p>Philip Bennett</p>
            <p>94 Kastanienallee, 10435 Berlin, Germany</p>
          </div>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.32em] text-amber-terminal">Dispute Resolution</h2>
          <div className="mt-2 space-y-2">
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a href="https://ec.europa.eu/consumers/odr" className="terminal-link underline" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board and do not do so voluntarily.</p>
          </div>
        </section>

        <section>
          <h2 className="text-sm uppercase tracking-[0.32em] text-amber-terminal">Right of Withdrawal (Widerrufsrecht)</h2>
          <div className="mt-2 space-y-2">
            <p>
              For digital content delivered immediately after purchase, the right of withdrawal expires once delivery has commenced with the consumer&apos;s prior express consent and acknowledgement that they thereby lose their right of withdrawal (§356 para. 5 BGB).
            </p>
            <p>Consumers acknowledge this at the point of purchase by ticking the required checkbox before checkout.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
