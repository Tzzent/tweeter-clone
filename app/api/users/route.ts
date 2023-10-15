import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(
  request: NextRequest,
) {
  try {
    const currentUser = await getCurrentUser();
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');

    if (username) {
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        }
      });
      return NextResponse.json(user);
    }

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: currentUser?.id,
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 3,
    });

    return NextResponse.json(users);

  } catch (err: any) {
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}