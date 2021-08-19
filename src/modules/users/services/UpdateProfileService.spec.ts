import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;

describe('updateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Locki',
      email: 'johnlocki@email.com',
      password: '123123132'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Urrots',
      email: 'johnurrots@email.com'
    });

    expect(updatedUser.name).toBe('John Urrots');
    expect(updatedUser.email).toBe('johnurrots@email.com');
  });

  it('should not be able to update the email to an existing email', async () => {
    await fakeUsersRepository.create({
      name: 'John Locki',
      email: 'johnlocki@email.com',
      password: '123123132'
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123123132'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Urrots',
      email: 'johnlocki@email.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Locki',
      email: 'johnlocki@email.com',
      password: '123123132'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Urrots',
      email: 'johnurrots@email.com',
      old_password: '123123132',
      password: '321321'
    });

    expect(updatedUser.password).toBe('321321');
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Locki',
      email: 'johnlocki@email.com',
      password: '123123132'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Urrots',
      email: 'johnurrots@email.com',
      old_password: 'wrong-passward',
      password: '321321'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user that does not exist.', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'John Urrots',
        email: 'johnurrots@email.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  
});
