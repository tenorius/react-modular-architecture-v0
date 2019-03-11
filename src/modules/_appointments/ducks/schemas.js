import { schema } from 'normalizr';

const appointment = new schema.Entity('appointments');
const arrayOfappointments = { appointments: [appointment] };

const fiscalYear = new schema.Entity('fiscalYears', {
  appointments: [appointment],
});
const arrayOfFiscalYears = { fiscalYears: [fiscalYear] };

const fortnight = new schema.Entity('fortnights', {
  appointments: [appointment],
});
const arrayOfFortnights = { fortnights: [fortnight] };

const feedback = new schema.Entity('feedbacks');
const arrayOfFeedbacks = { feedbacks: [feedback] };

export {
  appointment,
  arrayOfappointments,
  arrayOfFortnights,
  fiscalYear,
  arrayOfFiscalYears,
  feedback,
  arrayOfFeedbacks,
};
