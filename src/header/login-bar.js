import globalReducer from '../table-controller/utils/redux/global-reducer';
import { logout } from '../table-controller/utils/redux/slices/authSlice';
import { createElement } from '../utils/element_utils';

class LoginBar {
  constructor(root) {
    this.root = root;
    this.render();
  }
  render() {
    const loginbar = createElement('div', 'login-bar-wrapper');
    loginbar.textContent = 'Logout';
    loginbar.addEventListener('click', () => {
      globalReducer.dispatch(logout());
    });
    this.root.append(loginbar);
  }
}

export default LoginBar;
