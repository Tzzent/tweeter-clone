import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  userId?: string,
}

export async function GET(
  request: NextRequest, {
    params
  }: {
    params: IParams
  }
) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '3');

    const skip = (page * limit);

    const users = await prisma.user.findMany({
      where: {
        followerIds: {
          has: params.userId,
        }
      },
      skip: skip,
      take: limit,
    });

    return NextResponse.json(users);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}