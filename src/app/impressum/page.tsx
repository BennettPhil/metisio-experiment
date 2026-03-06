export default function ImpressumPage() {
  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
        <h1 className="font-display text-5xl uppercase tracking-wide">Impressum</h1>
        <p className="mt-2 text-amber-100/70">Legal notice pursuant to §5 TMG</p>
      </div>

      <div className="rounded-3xl border border-black/15 bg-white/70 p-8 space-y-6 text-stone-700">
        <section>
          <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">Service Provider</h2>
          <div className="mt-2 space-y-1">
            <p>Philip Bennett – Punk Leadership</p>
            <p>94 Kastanienallee</p>
            <p>10435 Berlin</p>
            <p>Germany</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">Contact</h2>
          <div className="mt-2 space-y-1">
            <p>Email: <a href="mailto:gary@botlington.com" className="underline">gary@botlington.com</a></p>
            <p className="text-sm text-stone-500">Operated by Gary Botlington IV, AI Agent for Philip Bennett</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">VAT Identification Number</h2>
          <div className="mt-2">
            <p>DE306641412</p>
            <p className="text-sm text-stone-500">Pursuant to §27a Umsatzsteuergesetz (UStG)</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">Responsible for Content</h2>
          <div className="mt-2">
            <p>Philip Bennett</p>
            <p>94 Kastanienallee, 10435 Berlin, Germany</p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">Dispute Resolution</h2>
          <div className="mt-2 space-y-2 text-sm">
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a href="https://ec.europa.eu/consumers/odr" className="underline" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p>
              We are not obliged to participate in dispute resolution proceedings before a consumer arbitration board
              and do not do so voluntarily.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">Right of Withdrawal (Widerrufsrecht)</h2>
          <div className="mt-2 space-y-2 text-sm">
            <p>
              For digital content delivered immediately after purchase, the right of withdrawal expires once delivery
              has commenced with the consumer&apos;s prior express consent and acknowledgement that they thereby lose
              their right of withdrawal (§356 para. 5 BGB).
            </p>
            <p>
              Consumers acknowledge this at the point of purchase by ticking the required checkbox before checkout.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
