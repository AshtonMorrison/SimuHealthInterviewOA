import { Router } from 'express';
import { createUser, loginUser } from '../handlers/user.handler';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.post('/login', loginUser);

export default userRouter;