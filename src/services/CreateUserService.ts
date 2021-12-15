import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { PrismaClient } from '.prisma/client';

interface IRequest {
  name: string;
  email: string;
  age: number;
  password: string;
}

class CreateUserService {
  async execute({ name, email, age, password }: IRequest) {
    if (!email || !name || !password) {
      throw Error('Email, name and password required!');
    }
    const prisma = new PrismaClient();

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw Error('Users already exists!');
    }

    const passwordHash = await hash(password, 8);

    const id = uuid();

    const user = await prisma.user.create({
      data: { id, name, email, age, password: passwordHash },
    });

    return user;
  }
}

export { CreateUserService };
