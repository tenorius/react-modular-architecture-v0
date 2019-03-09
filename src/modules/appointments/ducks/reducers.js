import { combineReducers } from 'redux';
import * as types from './types';
import reducerRegistry from '../../common/services/reducerRegistry';
import dataStatus from '../constants/dataStatus';


const helper = {
  isThisEditingAppointmentAlreadyCleared: (stateOne, actionOne) => {
    const aux = stateOne || {};
    return aux.id !== actionOne.id;
  },
};

const userFeedbacksReducerByIds = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_USER_FEEDBACKS_SUCCESS:
      return action.normalizedData.entities.feedbacks || {};
    case types.FETCH_CREATE_FEEDBACK_SUCCESS:
      return { ...state, [action.createdFeedback.id]: action.createdFeedback };
    default: return state;
  }
};

const userFeedbacksReducerList = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_USER_FEEDBACKS_SUCCESS:
      return action.normalizedData.result.feedbacks;
    case types.FETCH_CREATE_FEEDBACK_SUCCESS:
      return [...state, action.createdFeedback.id];
    default: return state;
  }
};

const userFeedbacksReducer = combineReducers({
  byIds: userFeedbacksReducerByIds,
  list: userFeedbacksReducerList,
});

reducerRegistry.save('userFeedbacks', userFeedbacksReducer);

const adminFeedbacksReducerByIds = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_ADMIN_FEEDBACKS_SUCCESS:
      return action.normalizedData.entities.feedbacks || {};
    case types.FETCH_UPDATE_FEEDBACK_SUCCESS:
      return { ...state, [action.updatedFeedback.id]: action.updatedFeedback };
    default: return state;
  }
};

const adminFeedbacksReducerList = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_ADMIN_FEEDBACKS_SUCCESS:
      return action.normalizedData.result.feedbacks;
    default: return state;
  }
};

const adminFeedbacksReducer = combineReducers({
  byIds: adminFeedbacksReducerByIds,
  list: adminFeedbacksReducerList,
});

reducerRegistry.save('adminFeedbacks', adminFeedbacksReducer);

const appointmentsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_APPOINTMENTS_BY_YEAR_SUCCESS:
      return { ...state, ...action.normalizedData.entities.appointments };
    case types.FETCH_APPOINTMENTS_DATA_SUCCESS:
      return action.normalizedData.entities.appointments;
    case types.FETCH_UPDATE_APPOINTMENT_SUCCESS:
    case types.FETCH_UPDATE_BLURRED_APPOINTMENT_SUCCESS:
      return {
        ...state,
        [action.updatedAppointment.id]: {
          ...state[action.updatedAppointment.id],
          ...action.updatedAppointment,
          status: dataStatus.SAVED,
        },
      };
    case types.START_APPOINTMENT_EDIT_MODE:
      return {
        ...state,
        [action.appointment.id]: {
          ...state[action.appointment.id],
          status: dataStatus.EDIT,
        },
      };
    case types.CLEAR_APPOINTMENT_EDIT_MODE:
      return {
        ...state,
        [action.oldAppointment.id]: { ...action.oldAppointment },
      };
    default: return state;
  }
};
reducerRegistry.save('appointments', appointmentsReducer);

const editingAppointmentReducer = (state = null, action) => {
  switch (action.type) {
    case types.START_APPOINTMENT_EDIT_MODE:
      return { ...action.appointment };
    case types.FETCH_UPDATE_APPOINTMENT_SUCCESS:
    case types.FETCH_UPDATE_BLURRED_APPOINTMENT_SUCCESS:
      return helper.isThisEditingAppointmentAlreadyCleared(state, action.updatedAppointment) ? state : null;
    default:
      return state;
  }
};
reducerRegistry.save('editingAppointment', editingAppointmentReducer);

const copiedAppointmentReducer = (state = null, action) => {
  switch (action.type) {
    case types.COPY_APPOINTMENT_DATA:
      return { ...action.appointment };
    default:
      return state;
  }
};
reducerRegistry.save('copiedAppointment', copiedAppointmentReducer);

const fiscalYearsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_APPOINTMENTS_BY_YEAR_SUCCESS:
      return {
        ...state,
        [action.fiscalYear]: action.normalizedData.entities.fiscalYears[action.fiscalYear],
      };
    /* ... */
    default: return state;
  }
};
reducerRegistry.save('fiscalYears', fiscalYearsReducer);

// /// Admin report reducers /// //
const adminAppointmentsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_APPOINTMENTS_REPORT_CACHE:
      return {};
    case types.FETCH_APPOINTMENTS_REPORT_SUCCESS:
      return { ...state, ...action.normalizedData.entities.appointments };
    default: return state;
  }
};
reducerRegistry.save('adminAppointments', adminAppointmentsReducer);

const fortnightsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_APPOINTMENTS_REPORT_CACHE:
      return {};
    case types.FETCH_APPOINTMENTS_REPORT_SUCCESS:
      return {
        ...state,
        [action.fortnightId]: action.normalizedData.entities.fortnights[action.fortnightId],
      };
    /* ... */
    default: return state;
  }
};
reducerRegistry.save('fortnights', fortnightsReducer);

const reportParamsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_REPORT_PARAMS_SUCCESS:
      return {
        ...action.params,
      };
    /* ... */
    default: return state;
  }
};
reducerRegistry.save('reportParams', reportParamsReducer);
// /// END Admin report reducers /// //

export default {
  appointmentsReducer,
  fiscalYearsReducer,
  reportParamsReducer,
};
