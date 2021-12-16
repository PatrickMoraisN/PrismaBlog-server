import { Request, Response } from 'express';
import { ListAllPostsService } from '../services/ListAllPostsService';

class ListAllPostsController {
  async handle(_request: Request, response: Response) {
    const listAllPostsService = new ListAllPostsService();

    const posts = await listAllPostsService.execute();

    return response.json(posts);
  }
}

export { ListAllPostsController };
