import { NextRequest, NextResponse } from "next/server";
import { Tweet, User } from "@prisma/client";

import prisma from "@/libs/prismadb";

interface IParams {
  type: 'top' | 'latest' | 'people' | 'media',
}

export async function GET(
  request: NextRequest, {
    params
  }: {
    params: IParams
  }) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const type = params.type.toLowerCase();

    const search = searchParams.get('search')?.trim() || '';
    const page = parseInt(searchParams.get('page') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const skip = (page * limit);

    let result: Tweet[] | User[] = [];

    switch (type) {
      case 'top':
        result = await prisma.tweet.findMany({
          where: {
            body: {
              contains: search,
              mode: 'insensitive',
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

        result = result.sort((a, b) =>
          b.savedIds.length +
          b.likedIds.length -
          (a.savedIds.length + a.likedIds.length),
        );
        break;

      case 'latest':
        result = await prisma.tweet.findMany({
          where: {
            body: {
              contains: search,
              mode: 'insensitive',
            }
          },
          orderBy: {
            createdAt: 'desc'
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
        break;

      case 'people':
        result = await prisma.user.findMany({
          where: {
            name: {
              contains: search,
              mode: 'insensitive',
            }
          },
          orderBy: {
            createdAt: 'desc',
          },
          skip: skip,
          take: limit,
        });
        break;

      case 'media':
        result = await prisma.tweet.findMany({
          where: {
            body: {
              contains: search,
              mode: 'insensitive',
            },
            NOT: {
              image: null,
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
        break;
      default:
        throw { msg: 'Invalid type for the search!', status: 400 };
    }

    return NextResponse.json(result);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}