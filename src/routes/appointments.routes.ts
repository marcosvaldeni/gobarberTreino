import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointmentService.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

});

export default appointmentsRouter;
