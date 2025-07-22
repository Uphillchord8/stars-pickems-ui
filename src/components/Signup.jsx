// src/components/Signup.jsx
import React, { useState, useContext } from 'react';
import { useNavigate }                from 'react-router-dom';
import { AuthContext }                from '../context/authcontext';
import api                            from '../utils/api';
import styles                         from './styles/Signup.module.css';

export default function Signup() {
  const { signup, isLoading, error } = useContext(AuthContext);
  const navigate                     = useNavigate();

  const [username, setUsername]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview]     = useState('/assets/default-avatar.png');

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file?.type.startsWith('image/')) {
      setAvatarFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirm) {
      // you could set a local error here if you like
      return;
    }

    try {
      await signup(username, email, password);

      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        await api.post('/user/avatar', formData);
      }

      navigate('/');
    } catch {
      // error is surfaced via AuthContext.error
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Your Account</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="e.g. DallasFan21"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="••••••••"
            required
          />

          <div className={styles.avatarSection}>
            <img
              src={preview}
              alt="Avatar preview"
              className={styles.avatarPreview}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className={styles.fileInput}
            />
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}