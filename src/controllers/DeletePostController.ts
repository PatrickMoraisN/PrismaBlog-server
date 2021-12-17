import { Request, Response } from 'express';
import { DeletePostService } from '../services/DeletePostService';

class DeletePostController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const deletePostService = new DeletePostService();

    const post = await deletePostService.execute(id);

    return response.json(post);
  }
}

export { DeletePostController };
