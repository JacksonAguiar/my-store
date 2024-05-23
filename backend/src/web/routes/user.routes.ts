import { Router } from 'express';
import { UserController } from 'src/web/controllers/UserController';


const UserRouter = Router();
const userController = new UserController();

UserRouter.post('/signup',userController.signUp);
UserRouter.post('/signin',userController.signIn);

export default UserRouter;
