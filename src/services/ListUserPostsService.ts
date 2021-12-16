import { PrismaClient } from '.prisma/client';

class ListUserPostsService {
  async execute(userId: string) {
    if (!userId) {
      throw Error('userId required!');
    }

    const prisma = new PrismaClient();

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      throw Error('User does not exist');
    }

    const posts = await prisma.post.findMany({
      where: { authorId: userId },
      include: { author: true },
    });

    return posts;
  }
}

export { ListUserPostsService };
