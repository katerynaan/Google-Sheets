import Header from './header/header';
import Table from './table-controller/table-controller';
import './base.css';
import globalReducer from './table-controller/utils/redux/global-reducer';
import AuthWindow from './table-controller/auth/auth';
import { login } from './table-controller/utils/redux/slices/authSlice';

const root = document.getElementById('root');

class Widget {
  constructor(root) {
    this.root = root;
    this.authwindow = null;
    this.header = null;
    this.table = null;
    this.render();
  }
  render() {
    const currentUsername = localStorage.getItem('username');
    if (currentUsername)
      globalReducer.dispatch(login({ value: currentUsername }));
    checkIfLoggedin.call(this);
    globalReducer.subscribe(() => {
      checkIfLoggedin.call(this);
    });
  }
}

function checkIfLoggedin() {
  const { value } = globalReducer.getState().auth;
  if (value.loggedIn) {
    if (!this.header) this.header = new Header(this.root);
    if (!this.table) this.table = new Table(this.root);
    if (this.authwindow) {
      this.authwindow.remove();
      this.authwindow = null;
    }
  } else {
    if (!this.authwindow) this.authwindow = new AuthWindow(this.root);
    if (this.header && this.table) {
      this.header.remove();
      this.header = null;
      this.table.remove();
      this.table = null;
    }
  }
}

new Widget(root);
