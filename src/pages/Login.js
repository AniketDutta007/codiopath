import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
      setLoggingIn(false);
      return addToast('Please enter both email and password', {
        appearance: 'error',
      });
    }
    const response = await auth.login(email, password);
    if (response.success) {
      history('/');
      setLoggingIn(false);
      return addToast('Successfully logged in', {
        appearance: 'success',
      });
    } else {
      setLoggingIn(false);
      return addToast(response.message, {
        appearance: 'error',
      });
    }
  };
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};
export default Login;
