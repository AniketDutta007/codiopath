import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    if (!email || !name || !password || !confirmPassword) {
      setSigningUp(false);
      return addToast('Please fill in all the details', {
        appearance: 'error',
      });
    }
    if (password !== confirmPassword) {
      setSigningUp(false);
      return addToast('Password and confirm password does not match', {
        appearance: 'error',
      });
    }
    const response = await auth.signup(email, name, password, confirmPassword);
    if (response.success) {
      history('/');
      setSigningUp(false);
      return addToast('Successfully Registered', {
        appearance: 'success',
      });
    } else {
      setSigningUp(false);
      return addToast(response.message, {
        appearance: 'error',
      });
    }
  };
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Sign Up</span>
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
          type="text"
          placeholder="User Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp}>
          {signingUp ? 'Registering...' : 'Register'}
        </button>
      </div>
    </form>
  );
};
export default Signup;
