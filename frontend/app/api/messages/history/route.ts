import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return NextResponse.json({ error: "Missing conversationId" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("naga_alaga_db");

    // Fetch messages for this chat, sorted by oldest first
    const messages = await db
      .collection("messages")
      .find({ conversationId })
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}