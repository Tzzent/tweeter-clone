import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      throw { msg: 'Unauthorized!', status: 401 };
    }

    const { username } = await request.json();

    const user = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        followerIds: {
          push: currentUser.id,
        },
      }
    });

    if (!user) {
      throw { msg: 'Invalid username', status: 400 };
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: {
          push: user.id,
        }
      }
    });

    return NextResponse.json(user);

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

    const { username } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      }
    });

    if (!user) {
      throw { msg: 'Invalid username', status: 400 };
    }

    const updatedUser = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        followerIds: {
          set: (user.followerIds || []).filter((id) => (
            id !== currentUser.id)
          )
        },
      }
    });

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: {
          set: (currentUser.followingIds || []).filter(id => id !== updatedUser.id),
        }
      }
    });

    return NextResponse.json(updatedUser);

  } catch (err: any) {
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}