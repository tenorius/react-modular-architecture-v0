import { ApiTree } from '@apicase/services';
import rootApi from '../../common/services/rootApi';


const appointmentService = new ApiTree(rootApi, [
  { url: 'appointment',
    meta: { requiresAuth: true },
    children: [
      { name: 'getAppointmentByFiscalYear', url: 'getFiscalYear', method: 'GET' },
      { name: 'getReportParams', url: 'getQueryParams', method: 'GET' },
      { name: 'getAppointmentsReport', url: 'getReport', method: 'POST' },
      { name: 'getInitialData', url: 'getAppointmentsData', method: 'GET' },
      { name: 'updateAppointment', method: 'PUT' },
    ],
  },
  { url: 'feedback',
    meta: { requiresAuth: true },
    children: [
      { name: 'getAdminFeedbacks', url: 'getall', method: 'GET' },
      { name: 'getFeedbacksByUser', url: 'getbyuser', method: 'GET' },
      { name: 'createFeedback', url: 'create', method: 'POST' },
      { name: 'updateFeedback', url: 'updatefeedback', method: 'PUT' },
    ],
  },
]);

export default appointmentService;
