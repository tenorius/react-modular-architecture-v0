import { toast, Slide } from 'react-toastify';
import './toast.css';

export class MyToast {
  constructor() {
    this.config = {
      hideProgressBar: true,
      position: 'top-right',
      autoClose: 3000,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnVisibilityChange: true,
      draggable: true,
      pauseOnHover: true,
      transition: Slide,
    };
  }

  info(msg) {
    toast.info(msg, {
      ...this.config,
      position: 'top-right',
      className: 'info-background toast-background',
      bodyClassName: ''
    });
  }

  success(msg) {
    toast.success(msg, {
      ...this.config,
      position: 'top-right',
      className: 'success-background toast-background',
    });
  }

  warning(msg) {
    toast.warning(msg, {
      ...this.config,
      position: 'top-right',
      className: 'warning-background toast-background',
    });
  }

  error(msg) {
    toast.error(msg, {
      ...this.config,
      position: 'top-right',
      className: 'error-background toast-background',
    });
  }
}
const myToast = new MyToast();
export default myToast;
