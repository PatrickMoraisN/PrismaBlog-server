import { Request, Response, Router } from 'express';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateUserController } from './controllers/CreateUserController';
import { EnsureAuthenticate } from './middlewares/EnsureAuthenticate';

const router = Router();
const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const ensureAuthenticate = new EnsureAuthenticate();

router.get('/', (_request: Request, response: Response) => {
  return response.json({ ok: true });
});

router.post('/create', createUserController.handle);
router.post('/login', authenticateUserController.handle);

export { router };
