import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdadeProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {

  public async show(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    const userWithoutPassword = { 
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };

    return res.json(userWithoutPassword);
  }
  
  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, old_password, password } = req.body;

    const updadeProfile = container.resolve(UpdadeProfileService);
  
    const user = await updadeProfile.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });
  
    const userWithoutPassword = { 
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  
    return res.json(userWithoutPassword);
  }
}
  