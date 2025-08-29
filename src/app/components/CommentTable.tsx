'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CommentTable() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useRef<Toast>(null);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    fetchComments();

    // Ambil comment baru dari localStorage (jika ada)
    const newCommentStr = localStorage.getItem('newComment');
    if (newCommentStr) {
      try {
        const newComment = JSON.parse(newCommentStr);
        setComments(prev => [newComment, ...prev]);
        setFilteredComments(prev => [newComment, ...prev]);
      } catch {}
      localStorage.removeItem('newComment');
    }
  }, [router]);

  useEffect(() => {
    if (!globalFilter) {
      setFilteredComments(comments);
    } else {
      const filtered = comments.filter((comment) =>
        comment.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        comment.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
        comment.body.toLowerCase().includes(globalFilter.toLowerCase())
      );
      setFilteredComments(filtered);
    }
  }, [globalFilter, comments]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await api.getComments();
      setComments(data);
      setFilteredComments(data);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to fetch comments',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    confirmDialog({
      message: 'Are you sure you want to delete this comment?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        try {
          await api.deleteComment(id);
          setComments(comments.filter(comment => comment.id !== id));
          toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Comment deleted successfully',
          });
        } catch (error) {
          toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete comment',
          });
        }
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div className="container py-5">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">💬 Comments Dashboard</h3>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            className="btn btn-danger"
            onClick={handleLogout}
          />
        </div>
        <div className="card-body">
          <div className="d-flex mb-3 gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search comments..."
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
            />
            <Button
              label="Create Comment"
              icon="pi pi-plus"
              className="btn btn-success"
              onClick={() => router.push('/create-comment')}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center">No comments found</td>
                  </tr>
                )}
                {filteredComments.map(comment => (
                  <tr key={comment.id}>
                    <td>{comment.id}</td>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td style={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {comment.body}
                    </td>
                    <td>
                      <Button
                        icon="pi pi-trash"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(comment.id)}
                        tooltip="Delete comment"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export const api = {
  // Fetch all comments
  getComments: async (): Promise<Comment[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },

  // Delete comment (simulate - JSONPlaceholder doesn't actually delete)
  deleteComment: async (id: number): Promise<void> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete comment');
  },
};
