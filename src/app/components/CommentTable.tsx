'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import styles from './CommentTable.module.css';

export default function CommentTable() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const toast = useRef<Toast>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    fetchComments();
  }, [router]);

  useEffect(() => {
    // Filter comments based on search
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
      console.error('Error fetching comments:', error);
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

  const actionBodyTemplate = (rowData: Comment) => (
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-danger p-button-text"
      onClick={() => handleDelete(rowData.id)}
      tooltip="Delete comment"
    />
  );

  const header = (
    <div className={styles.headerCustom}>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        <span className={styles.titleCustom}>💬 Comments Dashboard</span>
        <div className="d-flex gap-2">
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            className="p-button-outlined p-button-danger"
            onClick={handleLogout}
          />
        </div>
      </div>
      <div className="d-flex gap-3 align-items-center mt-2 flex-wrap">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search comments..."
          />
        </span>
        <Button
          label="Create Comment"
          icon="pi pi-plus"
          onClick={() => router.push('/create-comment')}
          className={styles.buttonCreate}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.bgMain}>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className={styles.cardCustom}>
        {header}
        <DataTable
          value={filteredComments}
          loading={loading}
          responsiveLayout="scroll"
          emptyMessage="No comments found"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
        >
          <Column field="id" header="ID" sortable />
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column
            field="body"
            header="Comment"
            body={(rowData) => (
              <div title={rowData.body} style={{ maxWidth: 300, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {rowData.body}
              </div>
            )}
          />
          <Column body={actionBodyTemplate} header="Actions" />
        </DataTable>
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