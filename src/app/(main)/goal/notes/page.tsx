import NotesClient from '@/components/notes/NotesClient';
import { cn } from '@/lib/utils';

interface NotesPageProps {
  searchParams: Promise<{
    goalId?: string;
  }>;
}

const NotesPage = async ({ searchParams }: NotesPageProps) => {
  const params = await searchParams;
  const goalId = params.goalId ? Number(params.goalId) : undefined;

  return (
    <div className={cn('h-full w-full sm:mt-54 md:mt-0 lg:mt-0')}>
      <NotesClient initialGoalId={goalId} />
    </div>
  );
};

export default NotesPage;
