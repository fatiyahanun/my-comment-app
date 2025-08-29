'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface CreateCommentPayload {
  name: string;
  email: string;
  body: string;
}

const api = {
  async createComment(payload: CreateCommentPayload): Promise<void> {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create comment');
  },
};

interface FormErrors {
  name?: string;
  email?: string;
  body?: string;
}

export default function CreateCommentForm() {
  const [formData, setFormData] = useState<CreateCommentPayload>({
    name: '',
    email: '',
    body: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Field is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Field is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    if (!formData.body.trim()) newErrors.body = 'Field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CreateCommentPayload, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await api.createComment(formData);
      toast.current?.show({
        severity: 'success',
        summary: 'Success',
        detail: 'Comment created successfully!',
      });
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create comment',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Toast ref={toast} />
      <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 500, width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{ fontWeight: 700, letterSpacing: 1 }}>Create New Comment</h2>
          <Button
            icon="pi pi-arrow-left"
            label="Back"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => router.push('/dashboard')}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Name *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <div className="mt-2">
                <Message severity="error" text={errors.name} />
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email *</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="mt-2">
                <Message severity="error" text={errors.email} />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="form-label fw-semibold">Comment *</label>
            <textarea
              id="body"
              value={formData.body}
              onChange={e => handleInputChange('body', e.target.value)}
              className={`form-control ${errors.body ? 'is-invalid' : ''}`}
              placeholder="Enter your comment"
              rows={5}
            />
            {errors.body && (
              <div className="mt-2">
                <Message severity="error" text={errors.body} />
              </div>
            )}
          </div>
          <div className="d-flex gap-2">
            <Button
              type="submit"
              label="Create Comment"
              icon="pi pi-check"
              loading={isSubmitting}
              className="btn btn-primary flex-fill"
              style={{ fontWeight: 600 }}
            />
            <Button
              type="button"
              label="Cancel"
              icon="pi pi-times"
              className="btn btn-secondary flex-fill"
              onClick={() => router.push('/dashboard')}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
