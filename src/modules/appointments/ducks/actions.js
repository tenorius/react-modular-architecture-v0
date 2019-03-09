/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import { normalize } from 'normalizr';
import * as types from './types';
import * as schema from './schemas';
import modelize from '../../common/services/modelize';
import logger from '../../common/services/logger';
import { getFortnightId } from '../../common/utils/helper';

const fetchAppointmentsByYear = () => ({
  type: types.FETCH_APPOINTMENTS_BY_YEAR,
});

const fetchAppointmentsByYearSuccess = (appointments, fiscalYear) => ({
  type: types.FETCH_APPOINTMENTS_BY_YEAR_SUCCESS,
  normalizedData: normalize(modelize({ [fiscalYear]: appointments }, 'fiscalYears', 'appointments'), schema.arrayOfFiscalYears),
  fiscalYear,
});

const fetchAppointmentsReportSuccess = (appointments, fiscalYear, month, fortnight, country, metrocity) => {
  const fortnightId = getFortnightId(fiscalYear, month, fortnight, country, metrocity);
  return {
    type: types.FETCH_APPOINTMENTS_REPORT_SUCCESS,
    normalizedData: normalize(modelize({ [fortnightId]: appointments }, 'fortnights', 'appointments'), schema.arrayOfFortnights),
    fortnightId,
  };
};

const clearAppointmentsReportCache = () => ({
  type: types.CLEAR_APPOINTMENTS_REPORT_CACHE,
});

const fetchReportParamsSuccess = params => ({
  type: types.FETCH_REPORT_PARAMS_SUCCESS,
  params,
});

const fetchUserFeedbacksSuccess = feedbacks => ({
  type: types.FETCH_USER_FEEDBACKS_SUCCESS,
  normalizedData: normalize({ feedbacks }, schema.arrayOfFeedbacks),
});

const fetchAdminFeedbacksSuccess = (feedbacks) => {
  logger.info(normalize({ feedbacks }, schema.arrayOfFeedbacks), 'normalized feedbacks');
  return {
    type: types.FETCH_ADMIN_FEEDBACKS_SUCCESS,
    normalizedData: normalize({ feedbacks }, schema.arrayOfFeedbacks),
  };
};

const fetchCreateFeedbackSuccess = createdFeedback => ({
  type: types.FETCH_CREATE_FEEDBACK_SUCCESS,
  createdFeedback,
});

const fetchUpdateFeedbackSuccess = updatedFeedback => ({
  type: types.FETCH_UPDATE_FEEDBACK_SUCCESS,
  updatedFeedback,
});

const fetchUpdateAppointment = appointment => ({
  type: types.FETCH_UPDATE_APPOINTMENT,
  appointment,
});

const fetchUpdateAppointmentSuccess = updatedAppointment => ({
  type: types.FETCH_UPDATE_APPOINTMENT_SUCCESS,
  updatedAppointment,
});

// const fetchUpdateBlurredAppointment = appointment => ({
//   type: types.FETCH_UPDATE_BLURRED_APPOINTMENT,
//   appointment,
// });

const fetchUpdateBlurredAppointmentSuccess = updatedAppointment => ({
  type: types.FETCH_UPDATE_BLURRED_APPOINTMENT_SUCCESS,
  updatedAppointment,
});

const fetchAppointmentsData = () => ({
  type: types.FETCH_APPOINTMENTS_DATA,
});

const fetchAppointmentsDataSuccess = (response) => {
  // console.log('normalized appointments', normalize({ fiscalYears: [{ appointments, id: fiscalYear }] }, schema.arrayOfFiscalYears));
  logger.info(normalize(modelize({ [response.currentFiscalYear]: response.appointments }, 'fiscalYears', 'appointments'), schema.arrayOfFiscalYears), 'normalized appointments');
  return {
    type: types.FETCH_APPOINTMENTS_DATA_SUCCESS,
    appointments: normalize(modelize({ [response.currentFiscalYear]: response.appointments }, 'fiscalYears', 'appointments'), schema.arrayOfFiscalYears),
    currentFiscalYear: response.currentFiscalYear,
  };
};

const startAppointmentEditMode = appointment => ({
  type: types.START_APPOINTMENT_EDIT_MODE,
  appointment,
});

const clearAppointmentEditMode = oldAppointment => ({
  type: types.CLEAR_APPOINTMENT_EDIT_MODE,
  oldAppointment,
});

const copyAppointmentData = appointment => ({
  type: types.COPY_APPOINTMENT_DATA,
  appointment,
});

export {
  fetchUpdateBlurredAppointmentSuccess,
  fetchAppointmentsReportSuccess,
  clearAppointmentsReportCache,
  fetchReportParamsSuccess,
  fetchUpdateAppointment,
  fetchUpdateAppointmentSuccess,
  fetchAppointmentsByYear,
  fetchAppointmentsByYearSuccess,
  fetchAppointmentsData,
  fetchAppointmentsDataSuccess,
  startAppointmentEditMode,
  clearAppointmentEditMode,
  fetchUserFeedbacksSuccess,
  fetchCreateFeedbackSuccess,
  fetchAdminFeedbacksSuccess,
  fetchUpdateFeedbackSuccess,
  copyAppointmentData,
};
