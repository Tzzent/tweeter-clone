import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  tweetId?: string,
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
    const take = parseInt(searchParams.get('take')!);
    const skip = parseInt(searchParams.get('skip')!);

    if (!take) {
      throw { msg: 'Invalid request!', status: 400 };
    }
    const comments = await prisma.comment.findMany({
      where: {
        tweetId: params.tweetId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
      take: take,
      skip: skip,
    });

    const totalComments = await prisma.comment.count({
      where: {
        tweetId: params.tweetId,
      },
    });

    const hasMore = totalComments > skip + take;

    return NextResponse.json({
      replies: comments || [],
      hasMore: hasMore,
    });

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}
