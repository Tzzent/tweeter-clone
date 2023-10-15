import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  const currentUser = await getCurrentUser();
  return NextResponse.json(currentUser);
}

export const dynamic = "force-dynamic";