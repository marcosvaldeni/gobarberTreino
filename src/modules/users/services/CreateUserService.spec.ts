import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateUsersService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const creatUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await creatUser.execute({
      name: 'John Snow',
      email: 'johnsnow@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const creatUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await creatUser.execute({
      name: 'John Snow',
      email: 'johnsnow@email.com',
      password: '123456',
    });

    expect(
      creatUser.execute({
        name: 'John Snow',
        email: 'johnsnow@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
