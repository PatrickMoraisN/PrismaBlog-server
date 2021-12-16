import { v4 as uuid } from 'uuid';
import { PrismaClient } from '.prisma/client';

type AuthorIdProps = {
  id: string;
  email: string;
  age: number;
  name: string;
};

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

    const post_id = uuid();

    const post = await prisma.post.create({
      data: {
        id: post_id,
        published,
        title,
        body,
        authorId,
      },
      include: { author: true },
    });

    return { post };
  }
}

export { CreatePostService };
