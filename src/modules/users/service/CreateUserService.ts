import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRespository = getRepository(User);

    const checkUserExists = await usersRespository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRespository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRespository.save(user);

    return user;
  }
}

export default CreateUserService;