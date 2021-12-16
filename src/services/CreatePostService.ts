import { v4 as uuid } from 'uuid';
import { PrismaClient } from '.prisma/client';

interface IRequest {
  published?: boolean;
  title: string;
  body: string;
  authorId: string;
}

class CreatePostService {
  async execute({ published = true, title, body, authorId }: IRequest) {
    if (!title || !body) {
      throw Error('Title or body invalid!');
    }

    const prisma = new PrismaClient();

    const id = uuid();

    const post = prisma.post.create({
      data: {
        id,
        published,
        title,
        body,
        authorId,
      },
    });

    return post;
  }
}

export { CreatePostService };
