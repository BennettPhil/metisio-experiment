import { NextRequest, NextResponse } from "next/server";

const NOTION_KEY = process.env.NOTION_API_KEY;
const DB_ID = "31cd51855ed680199552d5dd44063dcc";

export async function POST(req: NextRequest) {
  try {
    const { email, score, verdict } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!NOTION_KEY) {
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const notesText = `Score: ${score}/6 — ${verdict} — Source: score-widget — Captured: ${new Date().toISOString()}`;

    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: DB_ID },
        properties: {
          Name: { title: [{ text: { content: `LEAD: ${email}` } }] },
          Status: { select: { name: "Lead" } },
          Priority: { select: { name: "Low" } },
          Notes: { rich_text: [{ text: { content: notesText } }] },
        },
      }),
    });

    if (!res.ok) {
      console.error("Notion error:", await res.text());
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
