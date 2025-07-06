import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";

  const { id } = await db.note.create({
    data: {
      userId,
      text: "",
    },
  });

  return NextResponse.json({
    noteId: id,
  });
}
