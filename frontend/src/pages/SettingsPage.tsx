import { FormEvent, useState } from 'react';
import { changePassword } from '@/services/authApi';

export function SettingsPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus(null);
    setSubmitting(true);

    try {
      const message = await changePassword({ oldPassword, newPassword });
      setStatus(message);
      setOldPassword('');
      setNewPassword('');
    } catch {
      setError('Password update failed. Confirm the old password and retry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Account controls</h1>
        </div>
      </section>

      <section className="panel form-panel-inline settings-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Security</p>
            <h2>Change password</h2>
          </div>
        </div>

        <form className="stack-form" onSubmit={handleSubmit}>
          <label>
            <span>Current password</span>
            <input value={oldPassword} onChange={(event) => setOldPassword(event.target.value)} type="password" required />
          </label>
          <label>
            <span>New password</span>
            <input value={newPassword} onChange={(event) => setNewPassword(event.target.value)} type="password" required />
          </label>

          {error ? <div className="form-message error">{error}</div> : null}
          {status ? <div className="form-message success">{status}</div> : null}

          <button className="button button-primary" type="submit" disabled={submitting}>
            {submitting ? 'Updating...' : 'Update password'}
          </button>
        </form>
      </section>
    </div>
  );
}