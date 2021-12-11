import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', (_request: Request, response: Response) => {
  return response.json({ ok: true });
});

export { router };
