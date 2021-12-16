import { PrismaClient } from '.prisma/client';

class ListAllPostsService {
  async execute() {
    const prisma = new PrismaClient();

    const posts = await prisma.post.findMany({ include: { author: true } });

    return posts;
  }
}

export { ListAllPostsService };
