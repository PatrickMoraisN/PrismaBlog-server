import { Request, Response, Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';

const router = Router();
const createUserController = new CreateUserController();

router.get('/', (_request: Request, response: Response) => {
  return response.json({ ok: true });
});
router.post('/create', createUserController.handle);

export { router };
