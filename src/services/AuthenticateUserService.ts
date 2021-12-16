import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '.prisma/client';

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IRequest) {
    if (!email || !password) {
      throw Error('Email / Password is required!');
    }

    const prisma = new PrismaClient();

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw Error('Email / Password invalid!');
    }

    const isAValidPassword = await compare(password, userExists.password);

    if (!isAValidPassword) {
      throw Error('Email / Password invalid!');
    }

    const JWT_SECRET_HASH = process.env.JWT_SECRET;

    const token = sign({ email: userExists.email }, JWT_SECRET_HASH, {
      subject: userExists.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { AuthenticateUserService };
