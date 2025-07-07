import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";

  const newestNoteId = await db.note.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({
    newestNoteId: newestNoteId?.id,
  });
}
