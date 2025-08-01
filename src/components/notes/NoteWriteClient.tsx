'use client';
import NoteContentEditor from './NoteContentEditor';
import NoteHeader from './NoteHeader';
import NoteInfo from './NoteInfo';
import NoteToolbar from './NoteToolbar';

const NoteWriteClient = () => {
  return (
    <div className="relative h-full w-full">
      <div className="relative h-full max-w-793 sm:max-w-343 md:max-w-616 lg:max-w-793">
        <div className="mb-40">
          <NoteHeader />
        </div>
        <NoteInfo />
        <div className="my-16">
          <NoteContentEditor />
        </div>
        <div className="absolute bottom-0 z-10 w-full sm:max-w-343 md:max-w-616 lg:max-w-793">
          <NoteToolbar />
        </div>
      </div>
    </div>
  );
};

export default NoteWriteClient;
