import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

interface CreateAppointmentDTD {
  provider: string;
  date: Date;
}

@EntityRepository(Appointment)
class AppointmentsRepository  extends Repository<Appointment>{

  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }

  // public create({ provider, date }: CreateAppointmentDTD): Appointment {
  //   const appointment = new Appointment({ provider, date });

  //   this.appointments.push(appointment);

  //   return appointment;
  // }
  
}

export default AppointmentsRepository;
