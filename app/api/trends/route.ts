import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function GET(
  request: NextRequest,
) {
  try {
    const searchparams = request.nextUrl.searchParams;

    const page = parseInt(searchparams.get('page') || '0');
    const limit = parseInt(searchparams.get('limit') || '3');

    const skip = (page * limit);

    const trends = await prisma.trend.findMany({
      include: {
        _count: {
          select: {
            tweets: true
          }
        }
      },
      skip: skip,
      take: limit,
    });

    return NextResponse.json(trends);

  } catch (err: any) {
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}