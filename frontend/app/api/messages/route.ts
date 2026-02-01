import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
    
export async function POST(req: Request) {
  try {
    const { conversationId, sender, text } = await req.json();
    
    const client = await clientPromise;
    const db = client.db("naga_alaga_db"); // Name of your database

    const result = await db.collection("messages").insertOne({
      conversationId,
      sender,
      text,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}