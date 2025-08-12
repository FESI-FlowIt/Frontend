import NotesClient from '@/components/notes/NotesClient';
import { cn } from '@/lib/utils';

const NotesPage = async () => {
  return (
    <div className={cn('h-full w-full sm:mt-54 md:mt-0 lg:mt-0')}>
      <NotesClient />
    </div>
  );
};

export default NotesPage;
