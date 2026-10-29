import { Router } from 'express';
import { createUser, loginUser } from '../handlers/user.handler';
import { validateRequest } from '../middleware/validator.middleware';
import { userAuthSchema  } from '../middleware/validation.schema';

const userRouter = Router();

userRouter.post('/create', validateRequest(userAuthSchema), createUser);
userRouter.post('/login', validateRequest(userAuthSchema), loginUser);

export default userRouter;