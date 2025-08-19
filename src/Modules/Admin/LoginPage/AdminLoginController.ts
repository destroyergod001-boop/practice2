import axios from 'axios';
import { Page } from '../../../App';
import { apiBase } from '../../../../env';

export interface LoginState {
  username: string;
  password: string;
  loading: boolean;
}

export class LoginController {
  state: LoginState;
  setState: React.Dispatch<React.SetStateAction<LoginState>>;
  onNavigate: (page: Page) => void;
  onLogin: (user: any) => void;

  constructor(
    setState: React.Dispatch<React.SetStateAction<LoginState>>,
    onNavigate: (page: Page) => void,
    onLogin: (user: any) => void
  ) {
    this.setState = setState;
    this.onNavigate = onNavigate;
    this.onLogin = onLogin;

    this.state = {
      username: '',
      password: '',
      loading: false,
    };
  }

  handleChange = (field: 'username' | 'password', value: string) => {
    this.setState(prev => ({ ...prev, [field]: value }));
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    this.setState(prev => ({ ...prev, loading: true }));
    try {
      const res = await axios.post(`${apiBase}/get_login_admin`, {
        username: this.state.username,
        password: this.state.password,
      });
      console.log(res);
      if (res.data && typeof res.data === 'object') {
        this.onLogin(res.data);
        this.onNavigate('AdminBasePage');

       
      } else {
        alert('Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    } finally {
      this.setState(prev => ({ ...prev, loading: false }));
    }
  };
}
