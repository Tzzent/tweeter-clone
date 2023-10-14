import { NextRequest, NextResponse } from "next/server";
import { Visibility } from "@prisma/client";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import uploadCldphoto from "@/app/actions/uploadCldPhoto";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const skip = (page * limit);

    const tweets = await prisma.tweet.findMany({
      orderBy: {
        retweetedBy: {
          _count: 'desc',
        }
      },
      include: {
        owner: true,
        _count: {
          select: {
            comments: true,
          }
        },
      },
      skip: skip,
      take: limit,
    });

    return NextResponse.json(tweets);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}

export async function POST(
  request: Request
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      throw { msg: 'Unauthorized!', status: 401 };
    }

    const requestBody = await request.formData();

    const image = requestBody.get('image') as File | string;
    const body = requestBody.get('body') as string;
    const audience = requestBody.get('audience') as Visibility;

    const trendName = body.match(/#[a-zA-Z0-9-_]+/g)?.[0];

    let trendId = null;

    if (trendName) {
      const trendExists = await prisma.trend.findUnique({
        where: {
          name: trendName.substring(1),
        }
      });

      trendId = trendExists?.id;

      if (!trendExists) {
        const newTrend = await prisma.trend.create({
          data: {
            name: trendName,
          }
        });

        trendId = newTrend.id;
      }
    }

    const secure_url = (typeof image === 'object')
      ? (await uploadCldphoto(image)).secure_url
      : null;

    const newTweet = await prisma.tweet.create({
      data: {
        body: body,
        image: secure_url,
        audience: audience,
        ownerId: currentUser.id,
        trendId: trendId,
      },
    });

    return NextResponse.json(newTweet);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}
