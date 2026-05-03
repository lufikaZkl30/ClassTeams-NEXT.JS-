import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, userId } = await req.json();

  // contoh generate code
  const code = Math.random().toString(36).substring(2, 8);

  const team = {
    id: Date.now(),
    name,
    code,
    ownerId: userId,
  };

  return NextResponse.json({
    message: "Team created",
    team,
  });
};