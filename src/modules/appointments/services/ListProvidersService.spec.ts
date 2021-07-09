import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders =  new ListProvidersService(
      fakeUsersRepository
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
