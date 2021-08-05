import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUsersService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let creatUser: CreateUsersService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    creatUser = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await creatUser.execute({
      name: 'John Snow',
      email: 'johnsnow@email.com',
      password: '123456',
    });

    await expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await creatUser.execute({
      name: 'John Snow',
      email: 'johnsnow@email.com',
      password: '123456',
    });

    await expect(
      creatUser.execute({
        name: 'John Snow',
        email: 'johnsnow@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});
