import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '12312313213'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('12312313213');
  });

  it('should not be able to create two appointment at the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12312313213'
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12312313213'
      }),
    ).rejects.toBeInstanceOf(AppError);

  });
  

});
