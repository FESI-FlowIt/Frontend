'use client';
import NoteContentEditor from './NoteContentEditor';
import NoteHeader from './NoteHeader';
import NoteInfo from './NoteInfo';
import NoteToolbar from './NoteToolbar';

const NoteWriteClient = () => {
  return (
    <div className="w-full">
      <div className="relative mx-auto max-w-793">
        <div className="mb-40">
          <NoteHeader />
        </div>
        <NoteInfo />
        <div className="my-16">
          <NoteContentEditor />
        </div>
        <div className="fixed bottom-24 z-10 mx-auto w-full max-w-793">
          <NoteToolbar />
        </div>
      </div>
    </div>
  );
};

export default NoteWriteClient;
