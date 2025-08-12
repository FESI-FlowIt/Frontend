import NotesClient from '@/components/notes/NotesClient';

interface NotesPageProps {
  searchParams: Promise<{
    goalId?: string;
  }>;
}

const NotesPage = async ({ searchParams }: NotesPageProps) => {
  const params = await searchParams;
  const goalId = params.goalId ? Number(params.goalId) : undefined;

  return (
    <div className="h-full w-full">
      <NotesClient initialGoalId={goalId} />
    </div>
  );
};

export default NotesPage;
