import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, userId } = await req.json();

  // contoh cari team dari code
  if (code !== "abc123") {
    return NextResponse.json(
      { message: "Team not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Joined team",
  });
}