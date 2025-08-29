import CommentTable from '@/app/components/CommentTable';

// Server Side Rendering (Point Plus)
export default async function DashboardPage() {
  return (
    <div>
      <CommentTable />
    </div>
  );
}