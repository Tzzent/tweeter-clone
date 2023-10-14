import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  replyId?: string,
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

    const comment = await prisma.comment.update({
      where: {
        id: params.replyId,
      },
      data: {
        likedIds: {
          push: currentUser.id,
        }
      }
    });


    if (!comment) {
      throw { msg: 'Invalid ID', status: 400 };
    }

    return NextResponse.json(comment);

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

    const comment = await prisma.comment.findUnique({
      where: {
        id: params.replyId,
      }
    });

    if (!comment) {
      throw { msg: 'Invalid ID', status: 400 };
    }

    const updatedLikedIds = (comment.likedIds || []).filter((id) => (
      id !== currentUser.id)
    );


    const updatedReply = await prisma.comment.update({
      where: {
        id: params.replyId,
      },
      data: {
        likedIds: updatedLikedIds,
      }
    });

    return NextResponse.json(updatedReply);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}
