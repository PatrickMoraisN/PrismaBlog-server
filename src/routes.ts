import { Request, Response, Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreatePostController } from './controllers/CreatePostController';
import { CreateUserController } from './controllers/CreateUserController';
import { ListAllPostsController } from './controllers/ListAllPostsController';
import { EnsureAuthenticate } from './middlewares/EnsureAuthenticate';

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const ensureAuthenticate = new EnsureAuthenticate();
const createPostController = new CreatePostController();
const listAllPostsController = new ListAllPostsController();

router.get('/', (_request: Request, response: Response) => {
  return response.json({ ok: true });
});
router.get('/posts', ensureAuthenticate.ensure, listAllPostsController.handle);

router.post('/register', createUserController.handle);
router.post('/login', authenticateUserController.handle);
router.post(
  '/create/post',
  ensureAuthenticate.ensure,
  createPostController.handle
);

export { router };
