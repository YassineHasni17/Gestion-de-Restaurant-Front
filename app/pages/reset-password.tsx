import { useState } from 'react';
import { useRouter } from 'next/router';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { accessToken } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const response = await fetch('http://localhost:3000/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Mot de passe réinitialisé avec succès.');
    } else {
      setMessage(data.message || 'Erreur lors de la réinitialisation.');
    }
  };

  return (
    <div>
      <h1>Réinitialiser votre mot de passe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">Nouveau mot de passe :</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;
