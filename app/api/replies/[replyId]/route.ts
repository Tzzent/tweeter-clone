import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

interface IParams {
  replyId?: string,
}

export async function GET(
  request: Request, {
    params
  }: {
    params: IParams
  }
) {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: params.replyId,
      }
    });

    return NextResponse.json(comment);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}
