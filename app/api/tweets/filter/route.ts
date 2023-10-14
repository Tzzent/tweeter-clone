import { NextRequest, NextResponse } from "next/server";
import { Tweet } from "@prisma/client";

import prisma from "@/libs/prismadb";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const book = searchParams.get('book');
    const username = searchParams.get('username');

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const skip = (page * limit);

    if (!book || !username) {
      throw { msg: 'Please provide a book and username', status: 400 };
    }

    let tweets: Tweet[] = [];

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      }
    });

    if (!user) {
      throw { msg: 'This user does not exist!', status: 404 };
    }

    if (book === 'Tweets') {
      tweets = await prisma.tweet.findMany({
        where: {
          OR: [
            {
              ownerId: user.id,
            },
            {
              retweetedByIds: {
                has: user.id,
              }
            },
            {
              savedIds: {
                has: user.id,
              }
            }
          ]
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          _count: {
            select: {
              comments: true,
            }
          },
          owner: true,
        },
        skip: skip,
        take: limit,
      });
    }

    if (book === 'RepliedTweets') {
      tweets = await prisma.tweet.findMany({
        where: {
          comments: {
            some: {
              authorId: user.id,
            }
          }
        },
        include: {
          _count: {
            select: {
              comments: true,
            }
          },
          owner: true,
        },
        skip: skip,
        take: limit,
      });
    }

    if (book === 'MediaTweets') {
      tweets = await prisma.tweet.findMany({
        where: {
          OR: [
            {
              ownerId: user.id,
            },
            {
              retweetedByIds: {
                has: user.id,
              }
            },
            {
              savedIds: {
                has: user.id,
              }
            }
          ],
          AND: [
            {
              NOT: {
                image: null
              }
            }
          ]
        },
        include: {
          _count: {
            select: {
              comments: true,
            }
          },
          owner: true,
        },
        skip: skip,
        take: limit,
      });
    }

    if (book === 'LikedTweets') {
      tweets = await prisma.tweet.findMany({
        where: {
          likedIds: {
            has: user?.id,
          }
        },
        include: {
          _count: {
            select: {
              comments: true,
            }
          },
          owner: true,
        },
        skip: skip,
        take: limit,
      });
    }

    return NextResponse.json(tweets);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}