import { Response } from 'express';
import { IRequest } from '../middlewares/EnsureAuthenticate';
import { CreatePostService } from '../services/CreatePostService';

class CreatePostController {
  async handle(request: IRequest, response: Response) {
    const { title, body } = request.body;
    const { user_id } = request;

    const createPostService = new CreatePostService();

    const post = await createPostService.execute({
      title,
      body,
      authorId: user_id,
    });

    return response.json(post);
  }
}

export { CreatePostController };
