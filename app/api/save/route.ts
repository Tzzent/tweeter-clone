import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      throw { msg: 'Unauthorized!', status: 401 };
    }

    const { tweetId } = await request.json();

    const tweet = await prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        savedIds: {
          push: currentUser.id,
        }
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


export async function DELETE(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      throw { msg: 'Unauthorized!', status: 401 };
    }

    const { tweetId } = await request.json();

    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      }
    });

    if (!tweet) {
      throw { msg: 'Invalid ID', status: 400 };
    }

    const updateSavedIds = (tweet.savedIds || []).filter((id) => (
      id !== currentUser.id)
    );

    const updatedTweet = await prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        savedIds: updateSavedIds,
      }
    });

    return NextResponse.json(updatedTweet);

  } catch (err: any) {
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}