
import getCurrentUser from "@/app/actions/getCurrentUser";
import uploadCldphoto from "@/app/actions/uploadCldPhoto";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

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

    const requestBody = await request.formData();
    const body = requestBody.get('body') as string;
    const image = requestBody.get('image') as File | string;

    if (!body && !image) {
      throw { msg: 'Empty request!', status: 400 };
    }

    const secure_url = (typeof image === 'object')
      ? (await uploadCldphoto(image)).secure_url
      : null;

    const newReply = await prisma.comment.create({
      data: {
        body: body,
        image: secure_url,
        tweetId: params.tweetId,
        authorId: currentUser.id,
      },
      include: {
        author: true,
      }
    });

    return NextResponse.json(newReply);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}