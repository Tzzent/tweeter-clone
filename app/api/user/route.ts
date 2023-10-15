import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    return NextResponse.json(currentUser);
  } catch (err: any) {
    console.error('Error getting currentUser()', err);
    return new NextResponse(err);
  }
}