import NoteWriteClient from '@/components/notes/NoteWriteClient';
import { cn } from '@/lib/utils';

interface NoteWritePageProps {
  params: Promise<{ todoId: number }>;
}

const NoteWritePage = async ({ params }: NoteWritePageProps) => {
  const { todoId } = await params;

  return (
    <div className={cn('h-full w-full sm:mt-54 md:mt-0 lg:mt-0')}>
      <NoteWriteClient todoId={Number(todoId)} />
    </div>
  );
};

export default NoteWritePage;
