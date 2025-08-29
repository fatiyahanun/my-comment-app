'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import styles from './LoginForm.module.css';

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
    <div className={styles.bgLogin}>
      <div className={styles.cardLogin}>
        <h2 className="text-center mb-4" style={{ color: '#6366f1', fontWeight: 700, letterSpacing: 1 }}>Login to Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <InputText
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`form-control ${errors.username ? 'p-invalid' : ''}`}
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
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${errors.password ? 'p-invalid' : ''}`}
              placeholder="Enter your password"
              feedback={false}
              toggleMask
              inputClassName="w-100"
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
            className="w-100"
            size="large"
            style={{ background: 'linear-gradient(90deg, #38bdf8 0%, #6366f1 100%)', border: 'none', fontWeight: 600 }}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;