import { hash } from 'bcryptjs';
import { PrismaClient } from '.prisma/client';

interface IRequest {
  name: string;
  email: string;
  age: number;
  password: string;
}

class CreateUserService {
  async execute({ name, email, age, password }: IRequest) {
    if (!email) {
      throw new Error('Email required!');
    }
    const prisma = new PrismaClient();

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('Users already exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: { name, email, age, password: passwordHash },
    });

    return user;
  }
}

export { CreateUserService };