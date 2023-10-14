import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  tweetId?: string,
}

export async function GET(
  request: Request, {
    params
  }: {
    params: IParams
  }
) {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: params.tweetId,
      }
    });

    return NextResponse.json(tweet || []);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}
