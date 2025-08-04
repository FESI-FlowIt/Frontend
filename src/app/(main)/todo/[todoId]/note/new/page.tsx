import NoteWriteClient from '@/components/notes/NoteWriteClient';

interface NoteWritePageProps {
  params: Promise<{ todoId: string }>;
}

const NoteWritePage = async ({ params }: NoteWritePageProps) => {
  const { todoId } = await params;

  return (
    <div className="h-full w-full">
      <NoteWriteClient todoId={Number(todoId)} />
    </div>
  );
};

export default NoteWritePage;
