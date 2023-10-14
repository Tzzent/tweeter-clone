import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface IParams {
  tweetId: string,
}

export async function POST(
  request: Request, {
    params
  }: {
    params: IParams
  }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      throw { msg: 'Unauthorized!', status: 401 };
    }

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        retweetIds: {
          push: params.tweetId,
        }
      }
    });

    const tweetUpdated = await prisma.tweet.update({
      where: {
        id: params.tweetId,
      },
      data: {
        retweetedByIds: {
          push: user.id,
        }
      }
    });

    return NextResponse.json(tweetUpdated);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}

export async function DELETE(
  request: Request, {
    params
  }: {
    params: IParams
  }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      throw { msg: 'Unauthorized!', status: 401 };
    }

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        retweetIds: {
          set: currentUser.retweetIds.filter((id) => id !== params.tweetId)
        }
      }
    });

    const tweet = await prisma.tweet.findUnique({
      where: {
        id: params.tweetId
      }
    });

    if (!tweet) {
      throw { msg: 'This tweet does not exist!', status: 404 };
    }

    const tweetUpdated = await prisma.tweet.update({
      where: {
        id: params.tweetId,
      },
      data: {
        retweetedByIds: {
          set: tweet.retweetedByIds.filter((id) => id !== user.id)
        }
      }
    });

    return NextResponse.json(tweetUpdated);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}