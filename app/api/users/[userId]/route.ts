import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import updateCldPhoto from "@/app/actions/updateCldPhoto";
import uploadCldphoto from "@/app/actions/uploadCldPhoto";
import prisma from "@/libs/prismadb";

interface IParams {
  userId?: string,
}

export async function GET(
  request: Request, {
    params
  }: {
    params: IParams
  }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      }
    });

    return NextResponse.json(user);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}

export async function PUT(
  request: Request, {
    params
  }: {
    params: IParams
  }
) {
  try {
    const body = await request.formData();
    const currentUser = await getCurrentUser();

    if (
      !currentUser?.id || !currentUser?.email ||
      (currentUser?.id !== params.userId)
    ) {
      throw { msg: 'Unauthorized!', status: 401 };
    }

    const image = body.get('image') as File | string;
    const coverImage = body.get('coverImage') as File | string;

    const public_ImageId = currentUser?.image?.match(/\/([^/]+)\.jpg$/)?.[1];
    const public_CoverId = currentUser?.coverImage?.match(/\/([^/]+)\.jpg$/)?.[1];

    let image_secure_url = currentUser?.image;
    let cover_secure_url = currentUser?.coverImage;

    if ((typeof image === 'object') && public_ImageId) {
      const result = await updateCldPhoto(image, public_ImageId);
      image_secure_url = result.secure_url;

    } else if ((typeof image === 'object') && !public_ImageId) {
      const result = await uploadCldphoto(image);
      image_secure_url = result.secure_url;

    }

    if ((typeof coverImage === 'object') && public_CoverId) {
      const result = await updateCldPhoto(coverImage, public_CoverId);
      cover_secure_url = result.secure_url;

    } else if ((typeof coverImage === 'object') && !public_CoverId) {
      const result = await uploadCldphoto(coverImage);
      cover_secure_url = result.secure_url;
    }

    const username = body.get('username') as string | null;

    if (username && username !== currentUser.username) {
      const usernameExists = await prisma.user.findFirst({
        where: {
          username: username,
        }
      });

      if (usernameExists) {
        throw { msg: 'The username already exists!', status: 409 };
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: body.get('name') as string,
        username: body.get('username') as string,
        bio: body.get('bio') as string,
        image: image_secure_url,
        coverImage: cover_secure_url,
      }
    });

    return NextResponse.json(updatedUser);

  } catch (err: any) {
    console.log(err);
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}
