import { PrismaClient } from '.prisma/client';

class DeletePostService {
  async execute(id: string) {
    if (!id) {
      throw Error('Id invalid');
    }

    const prisma = new PrismaClient();

    const post = await prisma.post.delete({ where: { id } });

    if (!post) {
      throw Error('Id invalid');
    }

    return post;
  }
}

export { DeletePostService };
