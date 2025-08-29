// Define the Comment type locally if the module is missing
export interface Comment {
  postId: number;
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