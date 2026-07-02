import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { login } from '@/services/authApi';
import { useAuth } from '@/context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login: storeToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const token = await login({ email, password });
      storeToken(token);
      navigate('/dashboard', { replace: true });
    } catch {
      setError('Login failed. Check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-card hero-panel">
        <div className="hero-logo-row">
          <Logo className="hero-logo" />
        </div>
        <p className="eyebrow">Expense intelligence</p>
        <h1>See where every rupee goes.</h1>
        <p>
          Sign in to a dashboard built for visual spending analysis, category tracking, and fast account
          management.
        </p>
      </section>

      <section className="auth-card form-panel">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit} className="stack-form">
          <label>
            <span>Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            <span>Password</span>
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
          </label>

          {error ? <div className="form-message error">{error}</div> : null}

          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="helper-copy">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </div>
  );
}