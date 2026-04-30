export const runtime = "edge";

interface FeedbackBody {
  category?: string;
  message?: string;
  email?: string;
}

export async function POST(request: Request): Promise<Response> {
  let body: FeedbackBody;
  try {
    body = await request.json() as FeedbackBody;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const message = body.message?.trim().slice(0, 1000);
  if (!message) {
    return Response.json({ error: "Message is required" }, { status: 400 });
  }

  const category = body.category?.trim().slice(0, 50) || "General Feedback";
  const replyTo = body.email?.trim().slice(0, 100) || null;

  const entry = JSON.stringify({
    category,
    message,
    email: replyTo,
    createdAt: new Date().toISOString(),
    ua: request.headers.get("user-agent")?.slice(0, 120) || null,
  });

  // Store in KV — feedback: prefix, separate from rate: keys
  try {
    const { getRequestContext } = await import("@cloudflare/next-on-pages");
    const kv = (getRequestContext().env as Record<string, unknown>)["RATE_LIMIT_KV"] as {
      put(key: string, value: string): Promise<void>;
    };
    await kv.put(`feedback:${Date.now()}`, entry);
  } catch {
    // KV unavailable in local dev — silently ignore
  }

  // @AX:NOTE: [AUTO] Resend email notification — non-critical, never blocks the response
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const emailBody = [
      `Category: ${category}`,
      ``,
      `Message:`,
      message,
      replyTo ? `\nReply-to: ${replyTo}` : "",
      `\n---\nproposalkit.pages.dev`,
    ].join("\n");

    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ProposalKit Feedback <onboarding@resend.dev>",
        to: ["yechul.shin@gmail.com"],
        subject: `[ProposalKit] ${category}`,
        text: emailBody,
      }),
    }).catch(() => {
      // Fire-and-forget — email failure must not affect user response
    });
  }

  return Response.json({ ok: true });
}
