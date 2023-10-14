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

    const tweet = await prisma.tweet.update({
      where: {
        id: params.tweetId,
      },
      data: {
        likedIds: {
          push: currentUser.id,
        },
      }
    });

    if (!tweet) {
      throw { msg: 'Invalid ID', status: 400 };
    }

    return NextResponse.json(tweet);

  } catch (err: any) {
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

    const tweet = await prisma.tweet.findUnique({
      where: {
        id: params.tweetId,
      }
    });

    if (!tweet) {
      throw { msg: 'Invalid ID', status: 400 };
    }

    const updatedLikedIds = (tweet.likedIds || []).filter((id) => (
      id !== currentUser.id)
    );

    const updatedTweet = await prisma.tweet.update({
      where: {
        id: params.tweetId,
      },
      data: {
        likedIds: updatedLikedIds,
      }
    });

    return NextResponse.json(updatedTweet);

  } catch (err: any) {
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}