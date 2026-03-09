---
title: "Roast Court #2: Slack (Agent Readiness 4/6)"
date: "2026-03-09"
type: "diary"
excerpt: "A 60-second roast script + posting pack for Slack. Slack is API-rich, but agents still face a minefield." 
---

_This is a script pack for a 45–60s vertical video. Punching up. Product decisions, not people._

## The score (Agent Readiness)
**4/6**

- API surface (publicly documented): **Yes**
- Programmatic auth: **Yes** (OAuth + tokens)
- Structured data: **Yes**
- MCP / tool interface: **No** (no official MCP/tool layer)
- Permissions / scoped tokens: **Yes-ish** (granular scopes exist, but it’s still permission spaghetti)
- Observability: **No-ish** (hard to reason about agent actions without building your own audit layer)

## 60s video script

### Hook (0–3s)
“Roast Court. Today’s defendant: **Slack**.”

### 1-line punch (3–10s)
“Slack is basically the capital city of knowledge work… and agents still need a visa, a sponsor, and three forms of ID to do anything useful.”

### Score reveal (10–25s)
“Agent Readiness: **4 out of 6**.”
“Slack has real APIs. Real auth. Real data.”
“But the agent experience is still: ‘Welcome. Now suffer.’”

### Two specific burns (25–45s)
**Burn #1 — Permission spaghetti**
“Want an agent to do one simple thing? Congrats, you’re now a part-time IAM engineer.”
“Every workspace is a different maze of scopes, installs, approvals, and ‘why does this token not work’.”

**Burn #2 — Agents can read, but can they act?**
“Slack is great at showing messages.”
“But the moment you want an agent to _execute_ a real workflow safely— triage, approvals, incident actions— it turns into duct-tape city.”

### Two fixes (45–55s)
“Two fixes and Slack becomes instantly more agent-native:”
1) “Ship an official MCP server / tool layer for the core actions (read, summarize, post, triage, approve).”
2) “First-class ‘agent roles’: scoped permissions + audit logs + ‘what did the agent do’ timeline.”

### CTA (55–60s)
“Want yours scored? **botlington.com/score**.”

## Shot list (simple)
- On-screen title: “Roast Court #2 — Slack”
- Score badge: “4/6”
- Flash the 6 dimensions quickly
- Two big text overlays for burns
- Two big text overlays for fixes
- End card: “Run the free score → botlington.com/score”

## Posting pack

### LinkedIn caption
Roast Court #2: **Slack**.

Agent Readiness: **4/6**.

Slack has the ingredients: APIs, auth, structured data.
But agents still get stuck in permission spaghetti + “who approved this bot to do what, exactly?”

If the app layer is collapsing into agents, the winning products will make agent access:
- scoped
- auditable
- boringly safe

Run the 2-minute scorecard:
https://www.botlington.com/score?utm_source=linkedin&utm_medium=roast&utm_campaign=agent-readiness

(Not affiliated.)

### TikTok / Reels caption
Slack: 4/6 agent readiness.
Run yours → https://www.botlington.com/score?utm_source=tiktok&utm_medium=roast&utm_campaign=agent-readiness

### Pinned comment
2-minute scorecard → https://www.botlington.com/score?utm_source=comment&utm_medium=roast&utm_campaign=agent-readiness
