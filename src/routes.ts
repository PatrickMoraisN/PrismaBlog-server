import { Request, Response, Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreatePostController } from './controllers/CreatePostController';
import { CreateUserController } from './controllers/CreateUserController';
import { DeletePostController } from './controllers/DeletePostController';
import { ListAllPostsController } from './controllers/ListAllPostsController';
import { ListUserPostsController } from './controllers/ListUserPostsController';
import { EnsureAuthenticate } from './middlewares/EnsureAuthenticate';

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const ensureAuthenticate = new EnsureAuthenticate();
const createPostController = new CreatePostController();
const listAllPostsController = new ListAllPostsController();
const listUserPostsController = new ListUserPostsController();
const deletePostController = new DeletePostController();

router.get('/', (_request: Request, response: Response) => {
  return response.json({ ok: true });
});
router.get('/posts', ensureAuthenticate.ensure, listAllPostsController.handle);
router.get(
  '/posts/:id',
  ensureAuthenticate.ensure,
  listUserPostsController.handle
);

router.post('/register', createUserController.handle);
router.post('/login', authenticateUserController.handle);
router.post(
  '/create/post',
  ensureAuthenticate.ensure,
  createPostController.handle
);

router.delete('/post', ensureAuthenticate.ensure, deletePostController.handle);

export { router };
