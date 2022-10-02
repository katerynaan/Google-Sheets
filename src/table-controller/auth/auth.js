import globalReducer from '../utils/redux/global-reducer';
import { login } from '../utils/redux/slices/authSlice';
import './auth.css';

class AuthWindow {
  constructor(root) {
    this.root = root;
    this.render();
  }
  render() {
    const authWindow = document.createElement('div');
    authWindow.className = 'auth-window';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'auth-input';
    const button = document.createElement('button');
    button.className = 'auth-button';
    button.textContent = 'Submit';

    button.addEventListener('click', () => {
      globalReducer.dispatch(login({ value: input.value }));
    });
    authWindow.append(input, button);
    this.root.append(authWindow);
  }
  remove() {
    const instance = document.getElementsByClassName('auth-window')[0];
    if (instance) instance.remove();
  }
}

export default AuthWindow;
