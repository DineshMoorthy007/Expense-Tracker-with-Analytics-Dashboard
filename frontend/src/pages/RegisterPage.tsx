import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { register } from '@/services/authApi';

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const message = await register({ name, email, password });
      setSuccess(message);
      window.setTimeout(() => navigate('/login', { replace: true }), 900);
    } catch {
      setError('Registration failed. Use a valid email and a longer password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-card hero-panel hero-panel-alt">
        <div className="hero-logo-row">
          <Logo className="hero-logo" />
        </div>
        <p className="eyebrow">Create account</p>
        <h1>Build a clearer spending picture.</h1>
        <p>
          Track categories, break down monthly habits, and keep your dashboard focused on the data that matters.
        </p>
      </section>

      <section className="auth-card form-panel">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="stack-form">
          <label>
            <span>Name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} type="text" required />
          </label>
          <label>
            <span>Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            <span>Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              minLength={6}
              required
            />
          </label>

          {error ? <div className="form-message error">{error}</div> : null}
          {success ? <div className="form-message success">{success}</div> : null}

          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="helper-copy">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </div>
  );
}