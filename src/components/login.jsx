import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import styles from './login.module.css'

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    login(email, password, remember)
  }

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <h1 className={styles.title}>Stars Pick’ems</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Your password"
              required
            />
          </div>

          <div className={styles.formActions}>
            <label className={styles.remember}>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a href="#" className={styles.forgot}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className={styles.btnPrimary}>
            Log In
          </button>

          <div className={styles.signupLink}>
            Don’t have an account? <a href="#">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  )
}
