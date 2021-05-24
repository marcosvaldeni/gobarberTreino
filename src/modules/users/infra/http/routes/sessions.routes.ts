import { Router } from 'express';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@modules/users/service/AuthenticateUserService';

const sessionsRouter = Router();
const usersRepository = new UsersRepository();

sessionsRouter.post('/', async (req, res) => {

    const { email, password } = req.body;
    
    const usersRepository = new UsersRepository();
    const authenticateUser = new AuthenticateUserService(usersRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user, token});

});

export default sessionsRouter;
