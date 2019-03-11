// import logger from '../../common/services/logger';
import moment from 'moment';
import { appLoadingEnd, appLoadingStart } from '../../common/ducks/operations';
import * as actions from './actions';
import * as commonActions from '../../common/ducks/actions'; // todo: nao se deve importar diretamente do actions
import appointmentService from '../services/appointmentService';
import myToast from '../../common/utils/toast';
import timelineStatus from '../constants/timelineStatus';
import dataStatus from '../constants/dataStatus';
import logger from '../../common/services/logger';
import i18n from '../../common/i18n/i18n';

const t = i18n.getFixedT(null, 'appointments');

const helpers = {
  appointmentsFromAPItoState: (appointmentsApi, state, dispatch) => {
    const today = state.app.today.split('-');
    const appointmentsState = appointmentsApi.map((appointment) => {
      const timeline = helpers.getTimeline(appointment.lastDay.split('-'), today, appointment.fortnight);
      if (timeline === timelineStatus.CURRENT) {
        dispatch(commonActions.setData({ currentFortnightLastDay: appointment.lastDay }));
      }
      return {
        ...appointment,
        timeline,
        status: helpers.getDataStatus(appointment.chg, appointment.idle, appointment.bd),
      };
    });
    return appointmentsState;
  },
  adminAppointmentsFromAPItoState: (appointmentsApi) => {
    // const today = state.app.today.split('-');
    const appointmentsState = appointmentsApi.map(appointment => ({
      ...appointment,
      // timeline: helpers.getTimeline(appointment.lastDay.split('-'), today, appointment.fortnight),
      status: helpers.getDataStatus(appointment.chg, appointment.idle, appointment.bd),
      ...appointment.user,
      timestamp: moment(appointment.timestamp).format('DD/MM/YYYY - hh:mm[h]'),
    }));
    return appointmentsState;
  },
  appointmentsFromStatetoApi: (appointmentsState) => {
    const { chg, bd, idle, comment, id } = appointmentsState;
    return { chg, bd, idle, comment, id };
  },
  getTimeline: (lastdayParts, todayParts, fortnight) => {
    const yearDiff = (lastdayParts[0] - todayParts[0]);
    if (yearDiff !== 0) return yearDiff > 0 ? timelineStatus.FUTURE : timelineStatus.PAST;
    const monthDiff = (lastdayParts[1] - todayParts[1]);
    if (monthDiff !== 0) return monthDiff > 0 ? timelineStatus.FUTURE : timelineStatus.PAST;
    if (fortnight === 1) return todayParts[2] <= 15 ? timelineStatus.CURRENT : timelineStatus.PAST;
    if (fortnight === 2) return todayParts[2] > 15 ? timelineStatus.CURRENT : timelineStatus.FUTURE;
    return null;
  },
  getDataStatus: (chg, idle, bd) => ((chg + idle + bd !== 0) ? dataStatus.SAVED : dataStatus.EMPTY),
  newFeedbackFromStatetoApi: (message, user) => {
    const { country, eid, metrocity } = user;
    return {
      country,
      metrocity,
      eid,
      message,
    };
  },
  replyFromStatetoApi: (message, user) => {
    const { pid, eid } = user;
    return {
      message,
      eid,
      pid,
    };
  },
};


const fetchAppointmentsByYear = fiscalYear => (dispatch, getState) => {
  dispatch(appLoadingStart());
  return appointmentService('getAppointmentByFiscalYear', { url: fiscalYear })
    .on('done', (response) => {
      const { appointments } = response.body.data;
      const appointmentsState = helpers.appointmentsFromAPItoState(appointments, getState(), dispatch);
      dispatch(actions.fetchAppointmentsByYearSuccess(appointmentsState, fiscalYear));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

const fetchAppointmentsReport = (fiscalYear, month, fortnight, country, metrocity) => (dispatch, getState) => {
  // dispatch(appLoadingStart());
  const reqConfig = {
    body: { fiscalYear, month, fortnight, country, metrocity },
  };
  return appointmentService('getAppointmentsReport', reqConfig)
    .on('done', (response) => {
      const appointments = response.body.data;
      const appointmentsState = helpers.adminAppointmentsFromAPItoState(appointments, getState());
      dispatch(actions.clearAppointmentsReportCache());
      dispatch(actions.fetchAppointmentsReportSuccess(appointmentsState, fiscalYear, month, fortnight, country, metrocity));
      // dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      // dispatch(appLoadingEnd());
    })
    .on('error', () => {
      // dispatch(appLoadingEnd());
    });
};

const fetchReportParams = () => (dispatch) => {
  dispatch(appLoadingStart());
  return appointmentService('getReportParams', {})
    .on('done', (response) => {
      const options = response.body.data;
      dispatch(actions.fetchReportParamsSuccess(options));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

const fetchAppointmentsData = () => (dispatch) => {
  dispatch(appLoadingStart());
  return appointmentService('getAppointmentsData')
    .on('done', (response) => {
      dispatch(actions.fetchAppointmentsDataSuccess(response.body.data));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

const fetchUpdateAppointment = appointment => (dispatch) => {
  dispatch(appLoadingStart());
  const appointmentsApi = helpers.appointmentsFromStatetoApi(appointment);
  return appointmentService('updateAppointment', { body: appointmentsApi, url: appointment.id })
    .on('done', () => {
      dispatch(actions.fetchUpdateAppointmentSuccess(appointmentsApi));
      dispatch(appLoadingEnd());
    })
    .on('fail', () => {
      dispatch(appLoadingEnd());
    })
    .on('error', () => {
      dispatch(appLoadingEnd());
    });
};

const fetchUpdateBlurredAppointment = appointment => (dispatch) => {
  const appointmentsApi = helpers.appointmentsFromStatetoApi(appointment);
  return appointmentService('updateAppointment', { body: appointmentsApi, url: appointment.id })
    .on('done', () => {
      dispatch(actions.fetchUpdateBlurredAppointmentSuccess(appointmentsApi));
      myToast.success(t('toast-messages.appointment_auto_saved'));
    })
    .on('fail', () => {
      myToast.error(t('toast-messages.generic_error'));
    })
    .on('error', () => {
      myToast.error(t('toast-messages.generic_error'));
    });
};
const fetchCreateFeedBack = feedbackValue => (dispatch, getState) => {
  const feedbackApi = helpers.newFeedbackFromStatetoApi(feedbackValue, getState().user);
  return appointmentService('createFeedback', { body: feedbackApi })
    .on('done', (response) => {
      dispatch(actions.fetchCreateFeedbackSuccess(response.body.data.feedback));
      myToast.success(t('toast-messages.feedback_saved'));
    })
    .on('fail', () => {
      myToast.error(t('toast-messages.generic_error'));
    })
    .on('error', () => {
      myToast.error(t('toast-messages.generic_error'));
    });
};
const fetchUserFeedbacks = () => dispatch => appointmentService('getFeedbacksByUser', {})
  .on('done', (response) => {
    logger.info(response);
    dispatch(actions.fetchUserFeedbacksSuccess(response.body.data.feedbacks));
  })
  .on('fail', () => {
    myToast.error(t('toast-messages.generic_error'));
  })
  .on('error', () => {
    myToast.error(t('toast-messages.generic_error'));
  });

const fetchAdminFeedbacks = () => dispatch => appointmentService('getAdminFeedbacks', {})
  .on('done', (response) => {
    logger.info(response);
    dispatch(actions.fetchAdminFeedbacksSuccess(response.body.data.feedbacks));
  })
  .on('fail', () => {
    myToast.error(t('toast-messages.generic_error'));
  })
  .on('error', () => {
    myToast.error(t('toast-messages.generic_error'));
  });

const fetchUpdateFeedback = (feedbackId, reply) => (dispatch, getState) => {
  const feedbackApi = helpers.replyFromStatetoApi(reply, getState().user);
  return appointmentService('updateFeedback', { url: feedbackId, body: feedbackApi })
    .on('done', (response) => {
      logger.info(response);
      dispatch(actions.fetchUpdateFeedbackSuccess(response.body.data.feedback));
    })
    .on('fail', () => {
      myToast.error(t('toast-messages.generic_error'));
    })
    .on('error', () => {
      myToast.error(t('toast-messages.generic_error'));
    });
};
const handleAppointmentEditMode = id => (dispatch, getState) => {
  const state = getState();
  dispatch(actions.startAppointmentEditMode(state.appointments[id]));
  if (state.editingAppointment) {
    dispatch(actions.clearAppointmentEditMode(state.editingAppointment));
  }
};
const handleAppointmentClearEditMode = () => (dispatch, getState) => {
  const state = getState();
  if (state.editingAppointment) {
    dispatch(actions.clearAppointmentEditMode(state.editingAppointment));
  }
};

const copyAppointmentData = id => (dispatch, getState) => {
  const state = getState();
  dispatch(
    actions.copyAppointmentData(
      state.appointments[id],
    ),
  );
};

const pasteAppointmentData = id => (dispatch, getState) => {
  const state = getState();
  return dispatch(
    fetchUpdateAppointment({
      ...state.appointments[id],
      chg: state.copiedAppointment.chg,
      bd: state.copiedAppointment.bd,
      idle: state.copiedAppointment.idle,
    }),
  );
};

export {
  fetchAppointmentsByYear,
  fetchReportParams,
  fetchAppointmentsReport,
  fetchAppointmentsData,
  fetchUpdateAppointment,
  fetchUpdateBlurredAppointment,
  handleAppointmentEditMode,
  handleAppointmentClearEditMode,
  fetchCreateFeedBack,
  fetchUserFeedbacks,
  fetchAdminFeedbacks,
  fetchUpdateFeedback,
  copyAppointmentData,
  pasteAppointmentData,
};
