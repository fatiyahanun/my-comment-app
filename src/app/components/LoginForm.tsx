'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import styles from './LoginForm.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) newErrors.username = 'Field is required';
    if (!password.trim()) newErrors.password = 'Field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push('/dashboard');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 400, width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: '#6366f1', fontWeight: 700, letterSpacing: 1 }}>Login to Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div className="mt-2">
                <Message severity="error" text={errors.username} />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="mt-2">
                <Message severity="error" text={errors.password} />
              </div>
            )}
          </div>
          <Button
            type="submit"
            label="Login"
            className="btn btn-primary w-100"
            size="large"
            style={{ fontWeight: 600 }}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
