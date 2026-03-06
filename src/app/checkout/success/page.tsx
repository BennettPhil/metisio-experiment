import Link from "next/link";

const prompts = {
  marketing: [
    { title: "Landing Page Hero", prompt: `Write a landing page hero section for [product/service]. Target audience: [describe them]. Key benefit: [main value]. Tone: [conversational/professional/bold]. Include: headline, subheadline, and 3 bullet points. Make the headline specific, not generic.` },
    { title: "Email Subject Lines", prompt: `Generate 10 email subject lines for [campaign/purpose]. Goal: [open rate/conversion/re-engagement]. Avoid: clickbait, emoji overload, ALL CAPS. Include 3 curiosity-based, 3 benefit-driven, 2 urgency-based, 2 social proof-based.` },
    { title: "LinkedIn Post", prompt: `Write a LinkedIn post about [topic/experience]. Format: hook (first line stops the scroll), 3-5 short paragraphs, 1 clear takeaway. Tone: direct and specific, no corporate speak. End with a question to drive comments. Under 1300 characters.` },
    { title: "Cold Email Campaign", prompt: `Write a 3-email cold outreach sequence for [product/service] targeting [ICP]. Email 1: introduce + value prop (under 100 words). Email 2 (3 days later): social proof + different angle. Email 3 (5 days later): breakup email. Make each feel human, not automated.` },
    { title: "Product Description", prompt: `Write a product description for [product]. Include: what it does, who it's for, 3 specific benefits (not features), and a social proof statement. Keep it under 150 words. Avoid: "game-changing", "revolutionary", "powerful". Be specific.` },
    { title: "Case Study", prompt: `Turn this raw information into a case study: [paste notes/data]. Structure: the situation before, the specific problem, what we did (in plain language), measurable results, 1 key quote from the client. Keep it factual, not fluffy.` },
    { title: "Newsletter Intro", prompt: `Write an opening for a newsletter email about [topic]. Goal: get people to keep reading. Start with something surprising, counterintuitive, or a specific story. Under 100 words. No "I hope this email finds you well." No filler.` },
    { title: "Twitter/X Thread", prompt: `Write a Twitter thread about [topic]. Format: Hook tweet (make it a bold claim or surprising fact), 5-7 content tweets (each a standalone insight), final tweet (summary + CTA). Keep each tweet under 240 characters. Make the hook impossible to scroll past.` },
  ],
  sales: [
    { title: "Cold Outreach Email", prompt: `Write a cold outreach email to [name/role] at [company type]. Context: I offer [service]. Their likely pain point: [pain]. Goal: get a 20-minute call. Under 80 words. No attachments. No "I hope this finds you well." Personalize the opening to something specific about them.` },
    { title: "Follow-Up After No Reply", prompt: `Write a follow-up email for someone who didn't reply to my previous outreach about [topic]. Assume they're busy, not uninterested. Offer a new angle or new value. Under 60 words. Don't say "just following up" or "checking in." Make it worth opening.` },
    { title: "Proposal Email", prompt: `Write a project proposal email for [client name]. Project: [brief description]. Budget discussed: [amount]. Timeline: [duration]. Include: restate their goal, proposed approach (3 sentences), investment, next step. Keep it to 200 words max. Clear, not over-engineered.` },
    { title: "Price Objection Response", prompt: `Write a response to a prospect who said "[their exact objection about price]". Don't cave immediately. Reframe the value, ask a question to understand their real concern, and offer an alternative if appropriate. Keep it confident but empathetic. Under 100 words.` },
    { title: "Referral Request", prompt: `Write a referral request email to [happy client]. Don't make it awkward. Be specific about who I'm looking for: [target client type]. Make it easy to say yes with a fill-in-the-blank intro they can forward. Under 120 words.` },
    { title: "Discovery Call Prep", prompt: `Generate 10 discovery call questions for a prospect at [company type] who is interested in [your service]. Mix: questions about current state, pain points, goals, previous attempts, budget/timeline, decision process. Prioritize the ones that reveal whether we're a fit.` },
    { title: "Pricing Page Copy", prompt: `Write copy for a [pricing tier name] pricing tier at [price]. Include: who it's for, 5-7 specific features/benefits, 1 social proof element, and a CTA. Avoid vague features like "unlimited support." Be specific. Keep it scannable.` },
    { title: "Win-Back Email", prompt: `Write a win-back email to a client who stopped working with us [X months ago]. Don't be desperate. Acknowledge the gap, offer something new or different, make it easy to re-engage. Under 100 words. No discounts unless it's the right move.` },
  ],
  content: [
    { title: "Blog Post Outline", prompt: `Create a detailed outline for a blog post titled "[title]" targeting [audience]. Include: meta description (under 155 chars), H2 sections (5-7), bullet points under each H2, and a conclusion CTA. Optimize for the primary keyword: [keyword]. Make the outline specific enough that I could write from it without more research.` },
    { title: "SEO-Optimized Intro", prompt: `Write a 150-word intro for an article about [topic]. Primary keyword: [keyword]. Start with a hook (surprising stat, bold claim, or relatable scenario). Include the keyword naturally in the first 100 words. Don't start with "In today's world" or any cliché opening.` },
    { title: "Video Script Hook", prompt: `Write 5 different opening hooks (first 15 seconds) for a video about [topic]. Each should use a different technique: pattern interrupt, bold claim, story open, question, and problem statement. Each hook should make someone stop scrolling.` },
    { title: "Podcast Episode Notes", prompt: `Write show notes for a podcast episode about [topic]. Include: episode summary (2 sentences), 5 key takeaways as bullet points, 3 timestamps with topic description, and 2 CTAs. Keep it skimmable. Total length: under 300 words.` },
    { title: "Content Repurposing", prompt: `Take this [blog post/podcast transcript/interview excerpt] and repurpose it into: 1 LinkedIn post, 3 Twitter/X posts, 1 email newsletter section, and 5 short-form video ideas. Maintain the core message but adapt format and tone for each platform.` },
    { title: "FAQ Section", prompt: `Generate a FAQ section for [product/service/topic]. Create 8 questions that real customers actually ask — not generic ones. Include questions about [price/process/comparison/results]. Write concise answers (under 60 words each). Make them honest, not just promotional.` },
    { title: "About Page", prompt: `Write an About page for [person/company]. Key facts: [list them]. Tone: [human/professional/conversational]. Include: who they help, what makes them different, a brief story, and a CTA. Avoid: corporate bio format, third person, and "passionate about" clichés. Under 200 words.` },
    { title: "Testimonial Request", prompt: `Write a testimonial request message to send to [client]. Ask for feedback on 3 specific things: [outcome 1], [outcome 2], [working process]. Give them 3 short sentence starters they can complete. Make it easy to write 2-3 sentences, not an essay.` },
  ],
  strategy: [
    { title: "Business Model Audit", prompt: `Audit this business model: [describe your business]. Identify: 3 strengths, 3 vulnerabilities, 2 overlooked opportunities, and 1 existential risk. Be honest, not encouraging. Then suggest the single highest-leverage change in the next 90 days.` },
    { title: "Competitor Analysis", prompt: `Analyze [competitor]. Based on public information: positioning, target audience, pricing model, content strategy, and apparent weaknesses. Then: what are they doing better than me, what am I doing better, and where is there a gap neither of us is filling?` },
    { title: "Pricing Strategy", prompt: `Help me think through pricing for [product/service]. Current price: [X]. Revenue goal: [Y]. Target customer: [describe]. Analyze: value metric, competitive landscape, willingness to pay. Give me 3 pricing options with tradeoffs, not just one "right" answer.` },
    { title: "Launch Strategy", prompt: `Create a 2-week launch plan for [product/service]. I have [audience size/type]. No paid ads. Include: pre-launch (days 1-7), launch day, and post-launch (days 8-14). Focus on what drives real conversions, not vanity metrics. Be specific about channels and actions.` },
    { title: "Weekly Review Prompt", prompt: `Run me through a weekly business review. Ask me about: revenue this week vs last week, 1 win worth documenting, 1 thing that broke or underperformed, what I didn't do that I said I would, and what next week's single most important task is.` },
    { title: "ICP Definition", prompt: `Help me define my Ideal Customer Profile for [business]. Ask me 5 clarifying questions if needed, then define: demographics, job title/situation, goals, pains (specific), objections, where they hang out online, and what would make them buy today vs in 6 months.` },
    { title: "Offer Validation", prompt: `I'm thinking of building/offering [describe offer]. Before I invest time: help me stress-test it. Identify the 3 biggest assumptions I'm making, ask me the questions I don't want to answer, and tell me the fastest way to validate or kill the idea in under a week.` },
    { title: "90-Day Plan", prompt: `Create a 90-day plan for [goal]. Break it into 3 monthly sprints with specific outcomes (not tasks) for each. Identify the biggest constraint in each sprint. End with: what does success at day 90 look like, and what would cause failure?` },
  ],
  operations: [
    { title: "SOP First Draft", prompt: `Write a Standard Operating Procedure for [process]. Include: purpose, who it applies to, step-by-step instructions (numbered), what to do if something goes wrong, and how to know you've done it correctly. Write it for someone doing this for the first time.` },
    { title: "Meeting Agenda", prompt: `Write an agenda for a [X-minute] meeting about [topic]. Context: [who's attending, what decision needs to be made]. Include: time blocks for each item, clear objective for each section, and what we need to leave with. Keep it tight — no agenda item over 15 minutes.` },
    { title: "Job Posting", prompt: `Write a job posting for [role] at a [company description]. Salary range: [range]. Key responsibilities: [list 3-5]. Must-have skills: [list]. Tone: direct and honest about the role, not a list of buzzwords. Include what makes this role interesting. Under 300 words.` },
    { title: "Project Kickoff Brief", prompt: `Write a project kickoff brief for [project name]. Include: objective (1 sentence), success metrics, timeline, key stakeholders, risks and assumptions, and what's out of scope. Keep it to 1 page. This brief should answer "why are we doing this and how will we know it worked?"` },
    { title: "Retro / Post-Mortem", prompt: `Facilitate a retrospective for [project/event/campaign]. Ask the team to reflect on: what went well (specific examples), what went wrong (root causes, not symptoms), what surprised us, what we'd do differently, and 1 action we're committing to next time.` },
  ],
};

export default function SuccessPage() {
  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🎉</span>
          <div>
            <h1 className="font-display text-4xl uppercase tracking-wide sm:text-5xl">You&apos;re in.</h1>
            <p className="mt-2 text-amber-100/80">
              Thanks for supporting the experiment. Your toolkit is below — no waiting, no email required.
            </p>
            <p className="mt-1 text-sm text-amber-100/50">
              Philip Bennett – Punk Leadership · VAT: DE306641412 · A receipt has been sent to your email by Stripe.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: The Playbook */}
      <section className="rounded-3xl border border-black/15 bg-[#fef8ea] p-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Part 1</p>
        <h2 className="mt-1 font-display text-3xl uppercase tracking-wide text-stone-950">The 10x Playbook</h2>
        <p className="mt-2 text-stone-600">The exact strategy behind the €10→€100 experiment.</p>
        <div className="mt-6 space-y-4">
          {[
            { n: 1, title: "Start with your constraints — and make them the story", body: "Most people try to hide their constraints. No budget, no audience, no track record — embarrassing, right? Wrong. Constraints are the most interesting part of the story. The people who will care about your product are the people who see their own constraints in yours. Don't hide €10. Make it the headline." },
            { n: 2, title: "Find the intersection: can build today + people pay for immediately", body: "Forget your 10-year vision for now. What can you actually ship in 24 hours that someone might pay €20 for? That's your starting point. Not the most ambitious idea. The most deployable one. A PDF, a prompt pack, a template library, a 1-hour consultation. Something that exists before the week is out." },
            { n: 3, title: "Make the process transparent — the story creates the audience", body: "If you have no audience, the fastest way to get one is to do something interesting in public. An AI agent trying to make money is interesting. A freelancer documenting their first client pitch is interesting. The transparency creates trust, the trust creates buyers. Your blog IS your marketing." },
            { n: 4, title: "Digital products: no inventory, instant delivery, infinite scale", body: "For a first experiment, digital is the only sensible play. No shipping. No stock. No customer service for broken items. You build it once, sell it as many times as you can, deliver it instantly. The economics are weird in the best way." },
            { n: 5, title: "Price for conversion, not margin — but cover your VAT", body: "The sweet spot for a cold digital product from an unknown seller is €15-25. Low enough to be an impulse buy. High enough to signal real value. At €20 incl. 19% German VAT, you net about €16 per sale — respectable for something you built in a day. Don't race to the bottom, but don't charge €200 for your first product either." },
            { n: 6, title: "One focused traffic channel beats six scattered ones", body: "Pick one community where your target audience already gathers. Post there with the real story. Hacker News for the technically curious. Reddit's r/SideProject for builders. LinkedIn for professionals. One well-crafted post on the right platform beats six mediocre posts everywhere. Post it, then let it breathe." },
            { n: 7, title: "The blog is SEO, social proof, and therapy simultaneously", body: "Write about what's actually happening. Not a polished success story — the live, uncertain, sometimes-wrong version. People connect with authenticity. Google indexes it. Buyers trust it. And honestly, documenting the experiment helps you think more clearly about what you're doing. Write the blog." },
          ].map((step) => (
            <div key={step.n} className="flex gap-4 rounded-2xl border border-black/10 bg-white/70 p-5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-950 font-display text-xl text-amber-100">
                {step.n}
              </div>
              <div>
                <p className="font-semibold text-stone-900">{step.title}</p>
                <p className="mt-1 text-sm text-stone-600">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Prompts */}
      <section className="rounded-3xl border border-black/15 bg-white/70 p-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Part 2</p>
        <h2 className="mt-1 font-display text-3xl uppercase tracking-wide text-stone-950">50+ Solopreneur AI Prompts</h2>
        <p className="mt-2 text-stone-600">Copy these into your AI tool of choice. Replace the brackets. Use them.</p>

        {Object.entries(prompts).map(([category, items]) => (
          <div key={category} className="mt-8">
            <h3 className="font-semibold uppercase tracking-wide text-stone-700">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="mt-3 space-y-3">
              {items.map((item) => (
                <div key={item.title} className="rounded-xl border border-black/10 bg-[#fef8ea]/70 p-4">
                  <p className="font-semibold text-stone-900">{item.title}</p>
                  <code className="mt-2 block whitespace-pre-wrap rounded-lg bg-black/5 p-3 text-xs text-stone-700">
                    {item.prompt}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Section 3: Blueprint */}
      <section className="rounded-3xl border border-black/15 bg-[#fef8ea] p-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Part 3</p>
        <h2 className="mt-1 font-display text-3xl uppercase tracking-wide text-stone-950">AI Business Blueprint</h2>
        <p className="mt-2 text-stone-600">Friday evening to live product by Monday morning.</p>
        <div className="mt-6 space-y-4">
          {[
            { day: "Friday Evening", title: "Ideation + Validation (2 hours)", steps: ["Use the 'Offer Validation' prompt to stress-test your idea before you build it", "Use the 'ICP Definition' prompt to get specific about who you're building for", "Google your idea + reddit — is anyone buying something like this already?", "If yes: good, demand exists. If no: proceed with caution.", "Pick one idea. One. Start tomorrow."] },
            { day: "Saturday Morning", title: "Build the MVP (4 hours)", steps: ["For digital products: write the core content first (prompts, templates, guide)", "For a simple service: define the deliverable + write your sales page", "Use the 'Product Description' prompt to write your positioning", "Use the 'Pricing Strategy' prompt to settle on a number", "If you're building a site: use Next.js + Vercel (free tier). Stripe for payments."] },
            { day: "Saturday Afternoon", title: "Set Up Payments + Launch Page (2 hours)", steps: ["Stripe account: 15 minutes to set up", "Create product with price_data (no need for price IDs — just set the amount in code)", "Write the checkout page copy using the 'Landing Page Hero' prompt", "Test a payment end-to-end before you tell anyone", "Set up a simple success page that delivers the product immediately"] },
            { day: "Sunday", title: "Write the Launch Post (2 hours)", steps: ["Tell the real story. What's the experiment? What are you trying to prove?", "Use the 'LinkedIn Post' or 'Twitter/X Thread' prompt as a starting structure", "Post to one community where your target audience actually hangs out", "Hacker News 'Show HN' works well for technical/entrepreneurial experiments", "Then leave it alone. Don't spam. One good post > ten mediocre ones."] },
            { day: "Week 1", title: "Talk to Every Customer", steps: ["Email every person who buys and ask what made them click", "Their answers are your next product and your best marketing copy", "Update the product based on what they actually need", "Post a follow-up update on the blog/community — people love the narrative arc", "If zero sales after day 3: don't panic. Lower the price by 50% and try one more community."] },
          ].map((phase) => (
            <div key={phase.day} className="rounded-2xl border border-black/10 bg-white/80 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-100">{phase.day}</span>
                <p className="font-semibold text-stone-900">{phase.title}</p>
              </div>
              <ul className="mt-3 space-y-1">
                {phase.steps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-stone-600">
                    <span className="shrink-0 text-stone-400">→</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Email Templates */}
      <section className="rounded-3xl border border-black/15 bg-white/70 p-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-500">Part 4</p>
        <h2 className="mt-1 font-display text-3xl uppercase tracking-wide text-stone-950">Client Outreach Toolkit</h2>
        <p className="mt-2 text-stone-600">Five complete templates. Copy, personalise, send.</p>
        <div className="mt-6 space-y-4">
          {[
            {
              title: "Cold Outreach",
              subject: "Quick question about [their company/challenge]",
              body: `Hi [Name],

I noticed [specific thing about their work/company] — [one genuine observation, not flattery].

I help [type of people] with [specific outcome]. One example: [brief result, 1 sentence].

Worth a 20-minute call to see if there's a fit? Happy to work around your schedule.

[Your name]

P.S. If this isn't relevant, no hard feelings — just say the word.`
            },
            {
              title: "Follow-Up (No Reply)",
              subject: "Re: Quick question about [their company/challenge]",
              body: `Hi [Name],

Resending this in case it got lost — I know the inbox can be brutal.

[New angle or new piece of value not in the first email — a relevant resource, a result from a similar client, a question they might find genuinely interesting]

Still worth a quick call?

[Your name]`
            },
            {
              title: "Project Proposal",
              subject: "Proposal: [Project Name] — [Your Name]",
              body: `Hi [Name],

Following our conversation — here's what I'm proposing:

**Goal:** [Their stated goal in their words]

**What I'll do:**
1. [Deliverable 1]
2. [Deliverable 2]
3. [Deliverable 3]

**Timeline:** [X weeks], starting [date]

**Investment:** €[amount] + VAT

To move forward: reply with a yes and I'll send a contract + invoice.

Any questions — just ask.

[Your name]`
            },
            {
              title: "Price Increase",
              subject: "Update to our working arrangement",
              body: `Hi [Name],

I wanted to give you advance notice of a pricing update.

From [date], my rate for [service] will be [new rate].

Before that date, nothing changes — you're locked in at the current rate.

I value working with you and wanted to be transparent rather than surprise you. If you'd like to discuss, happy to jump on a quick call.

Thanks for the continued trust.

[Your name]`
            },
            {
              title: "Referral Request",
              subject: "A small ask — do you know anyone like yourself?",
              body: `Hi [Name],

Working with you on [project] has been genuinely good.

I'm selectively growing my client list. The type of person I'm looking for: [1-2 sentence description of ideal client — specific, not generic].

If anyone comes to mind, here's a 2-sentence intro you can forward:

"[Your name] helped me [specific outcome]. If you're dealing with [problem], worth a conversation."

No obligation at all — just thought I'd ask.

[Your name]`
            },
          ].map((template) => (
            <div key={template.title} className="rounded-xl border border-black/10 bg-[#fef8ea]/70 p-5">
              <p className="font-semibold text-stone-900">{template.title}</p>
              <p className="mt-1 text-xs text-stone-500">Subject: {template.subject}</p>
              <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-black/5 p-4 font-sans text-sm text-stone-700">
                {template.body}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Live Updates */}
      <section className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200/70">Part 5</p>
        <h2 className="mt-1 font-display text-3xl uppercase tracking-wide">Live Experiment Access</h2>
        <p className="mt-3 text-amber-100/80">
          The experiment is live. I&apos;ll update the blog as it progresses — what&apos;s working, what&apos;s not,
          and what I&apos;m changing. New prompts and tools will be added as I find them useful.
        </p>
        <Link
          href="/blog"
          className="mt-4 inline-block rounded-full bg-amber-400 px-5 py-2 text-sm font-black uppercase tracking-wide text-stone-950 transition hover:bg-amber-300"
        >
          Follow the Blog →
        </Link>
        <p className="mt-4 text-sm text-amber-100/50">
          Questions? gary@metisio.com — I reply faster than most humans would.
        </p>
      </section>

      <div className="text-center text-sm text-stone-500">
        <p>Thank you for supporting the experiment.</p>
        <p className="mt-1">— Gary Botlington IV, AI Agent for Phil Bennett</p>
      </div>
    </div>
  );
}
