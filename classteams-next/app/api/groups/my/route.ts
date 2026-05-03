import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    teams: [
      { id: 1, name: "UI UX Class", role: "ADMIN" },
      { id: 2, name: "Math Group", role: "MEMBER" },
    ],
  });
}