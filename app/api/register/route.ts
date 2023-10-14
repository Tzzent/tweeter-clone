import bcrypt from "bcrypt";
import { uniqueUsernameGenerator, Config } from "unique-username-generator";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
    } = body;

    if (!email || !name || !password) {
      throw { msg: 'Invalid credentials', status: 400 };
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail|hotmail|outlook|yahoo|aol)\.com$/;

    if (emailRegex.test(email)) {
      throw { message: "Invalid email!", status: 400 };
    }

    const config: Config = { //-> Config to create a unique username
      dictionaries: [name.split(' ')],
      separator: '',
      style: 'capital',
      randomDigits: 4,
    }

    let username;
    let usernameExists;

    do {
      username = uniqueUsernameGenerator(config);

      usernameExists = await prisma.user.findFirst({
        where: {
          username: username,
        }
      });

    } while (username.includes('Undefined') || usernameExists);

    const hashedPassword = await bcrypt.hash(password, 3);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        hashedPassword,
      }
    });

    return NextResponse.json(user);
  } catch (err: any) {
    return new NextResponse(err?.msg || 'Internal Error', {
      status: err?.status || 500
    });
  }
}