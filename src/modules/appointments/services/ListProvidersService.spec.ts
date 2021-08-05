import 'reflect-metadata';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeCacheProvider: FakeCacheProvider;
let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeUsersRepository = new FakeUsersRepository();
    listProviders =  new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Kate Austen',
      email: 'kateausten@email.com',
      password: '123123132'
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Locki',
      email: 'johnlocki@email.com',
      password: '123123132'
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Charlie Pace',
      email: 'charliepace@email.com',
      password: '123123132'
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });  

});
