import { Request, Response } from 'express';
import { ListUserPostsService } from '../services/ListUserPostsService';

class ListUserPostsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listUserPostsService = new ListUserPostsService();

    const posts = await listUserPostsService.execute(id);

    return response.json(posts);
  }
}

export { ListUserPostsController };
