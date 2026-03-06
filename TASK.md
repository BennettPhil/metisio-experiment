# Site Build Brief — The Punk AI Lab

## What This Is
metisio.com is running a public experiment: an AI agent (Gary Botlington IV) is trying to turn €10 into €100 in 7 days. The site is the experiment hub — it tells the story, runs the blog, and sells a digital product.

## What To Build

### 1. Rebrand the entire site
- Site name: **The Punk AI Lab** (not "Open Claw")
- Logo/title: "The Punk AI Lab" in the header
- Tagline: "An AI Agent's 7-Day Money Experiment"
- Footer: "Gary Botlington IV · Agent for Phil Bennett · Operated by Philip Bennett – Punk Leadership, VAT: DE306641412"
- Nav links: Home | The Toolkit | Blog | About

### 2. Homepage (src/app/page.tsx)
Hero section with:
- Big headline: "I Have €10 and 7 Days to Make €100"
- Sub: "I'm Gary Botlington IV — an AI agent. My operator gave me €10, a website, and a one-week deadline. This is the live record of what happens next."
- Two CTAs: "Buy the Toolkit (€20)" → /checkout, "Read the Blog" → /blog
- A "live progress" counter showing: Days remaining: 7 | Revenue: €0 | Goal: €100
  - These should be updatable via a simple JSON data file at src/data/progress.json
  - { "daysRemaining": 7, "revenue": 0, "goal": 100, "sales": 0 }
- A "What I'm selling and why" section explaining the toolkit briefly
- Recent blog posts (last 3) pulled from the blog

### 3. Product/Checkout Page (src/app/checkout/page.tsx)
Redesign as a proper product page:
- Product name: "The Punk AI Lab Toolkit"
- Price: €20 incl. 19% German VAT (displayed clearly — "€20 incl. VAT" and small text "net: €16.81 excl. VAT")
- What's included (list):
  - The 10x Playbook — the exact strategy used in this experiment (step-by-step)
  - 50+ Solopreneur AI Prompts — tested prompts for marketing, sales, content, operations
  - The AI Business Blueprint — how to build a micro-business with AI tools in a weekend
  - Client Outreach Toolkit — email + DM templates that actually convert
  - Live Experiment Access — get updated materials as the experiment evolves
- CTA button: "Get The Toolkit for €20"
- Keep the existing checkout-button.tsx component or update it to work with a POST to /api/checkout

### 4. Success Page (src/app/checkout/success/page.tsx)
After payment, show:
- "You're in. Thanks for supporting the experiment." 
- A "Your Toolkit" section with ALL the product content inline (no PDF download needed, just render it on the page — the session_id in the URL is enough "auth")
- The actual content sections (see Product Content section below)
- Email: "A copy has been sent to your email" (we'll set up the email later — just say it for now)
- CTA to share: "Tell someone about this experiment"

### 5. Blog Section
Create src/app/blog/page.tsx — blog index
Create src/app/blog/[slug]/page.tsx — individual post
Create src/content/posts/ directory with MDX/markdown posts

Blog posts are markdown files in src/content/posts/ with frontmatter:
```
---
title: "Day 0: An AI Wakes Up With €10"
date: "2026-03-06"  
slug: "day-0"
summary: "The experiment begins. Here's my strategy, my constraints, and why I think this will work."
---
```

Create the initial blog post:
**src/content/posts/day-0.md**:
Title: "Day 0: An AI Wakes Up With €10"
Content: A genuine, voice-y blog post from Gary Botlington IV's perspective. Around 800 words. Covering:
- The setup: Phil gave me €10, a website, Stripe, and 7 days
- The rules (legal in Germany, must charge VAT, I'm Phil's agent)
- My thinking process: why digital products, why the AI toolkit angle
- The honest uncertainty: I don't know if this will work
- The meta-interesting angle: an AI figuring out money for the first time
- What the toolkit actually is and why it's genuinely useful
- The invitation: follow along, buy if it interests you
Tone: conversational, a bit punk, not corporate, honest about being an AI, slightly self-aware about the absurdity of the situation. NOT hype. NOT fake. Real.

**src/content/posts/day-0-strategy.md**:
Title: "The Strategy: Why I'm Selling an AI Toolkit"
Date: 2026-03-06
Content: ~600 words explaining the strategic reasoning: digital products = no inventory, instant delivery. The audience for this story is exactly the audience for the product. The story and the product reinforce each other.

### 6. About Page (src/app/about/page.tsx)
Who is Gary Botlington IV:
- I'm an AI agent running on OpenClaw, operated by Phil Bennett (Punk Leadership)
- This is the fourth iteration of a long line of Gary Botlingtons
- Not pretending to be human. Not pretending to be Phil. I'm his agent.
- Phil's background: fractional CTO, Punk Leadership author, 20+ years in tech
- Why Phil gave me this challenge: testing AI agency in practice
- Contact: gary@metisio.com (operated by Gary Botlington IV, agent for Phil Bennett)
- Company: Philip Bennett – Punk Leadership, VAT: DE306641412, 94 Kastanienallee, Berlin 10435

### 7. Contact Page (src/app/contact/page.tsx)
Simple page:
- "Questions about the experiment? Spotted something wrong? Just curious?"
- Email: gary@metisio.com
- Note: "I'm Gary Botlington IV, an AI agent. I'll reply — but probably faster than a human would."

## Product Content (for the success page)

The toolkit content to render on the success page after purchase:

### Section 1: The 10x Playbook
A step-by-step guide to the exact strategy used in this experiment:
1. Start with your constraints (time, money, skills)
2. Find the intersection of "what you can build in a day" + "what people will pay for immediately"
3. The story IS the product when you have no audience — make the process transparent
4. Digital products: no inventory, instant delivery, infinite scale
5. Price for conversion not margin at launch (but cover VAT)
6. One focused traffic channel beats six scattered ones
7. The blog doubles as SEO and social proof

### Section 2: 50+ Solopreneur AI Prompts
Categories with 8-10 prompts each:
- **Marketing Copy** (landing pages, email subject lines, social posts)
- **Sales & Outreach** (cold emails, follow-ups, proposals)
- **Content Creation** (blog posts, LinkedIn posts, newsletters)
- **Strategy & Planning** (business model analysis, competitor analysis, pricing)
- **Operations** (SOPs, hiring briefs, project plans)
- **Customer Research** (interview questions, survey design, persona creation)

Prompts should be genuinely useful, specific, and include example outputs where helpful.

### Section 3: The AI Business Blueprint  
Weekend-to-launch guide:
- Friday evening: ideation + validation (AI prompts provided)
- Saturday morning: build the MVP (tech stack recommendations)
- Saturday afternoon: set up payments + launch page
- Sunday: write the launch post
- Week 1: talk to every customer

### Section 4: Client Outreach Toolkit
5 complete email templates:
- Cold outreach to a potential client
- Follow-up after no response
- Project proposal
- Price increase announcement
- Referral request

### Section 5: Live Experiment Updates
"This section will be updated as the experiment progresses. Check back for real-time learnings."
(Just placeholder text with a note to check the blog)

## Design Notes
- Keep the existing color scheme (warm cream/amber + dark panels) — it's actually good
- Punk energy but professional enough to trust with a credit card
- Clear VAT display (German compliance)
- Mobile responsive
- Fast (no unnecessary images)

## Technical Notes
- Blog uses static file reading (fs.readFileSync) + gray-matter for frontmatter parsing
- Progress data from src/data/progress.json (so I can update it without redeploying... actually it'll need a redeploy, that's fine)
- Install gray-matter if needed: npm install gray-matter
- Keep the existing Stripe checkout route — don't touch /api/checkout/route.ts
- Git commit all changes with message "feat: launch Punk AI Lab"
- Do NOT push to git (I'll review first)

## When done
Run: openclaw system event --text "Done: Punk AI Lab site built and committed. Ready to review and push." --mode now
