'use client';

import EmptyIcon from '@/assets/icons/timer.svg';

export default function EmptyTodoGuide() {
  return (
    <div className="mb-40 flex h-full flex-col items-center justify-center text-center">
      <EmptyIcon className="text-timer" width={80} height={80} fill="currentColor" />
      <div className="mt-16">
        <p className="text-text-02 text-body-b-16 md:text-body-sb-20">할 일이 없어요!</p>
        <p className="text-text-02 text-body-b-16 md:text-body-sb-20 mt-12">
          할 일을 생성하면 시간 측정이 가능해요
        </p>
      </div>
    </div>
  );
}
