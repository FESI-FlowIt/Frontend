import React, { useState } from 'react';

import GoalIcon from '@/../public/assets/icons/goalIcon.svg';
import TodoIcon from '@/../public/assets/icons/todoIcon.svg';
import { Input } from '@/components/ui/Input';

const MAX_LENGTH = 30;

const NoteInfo = () => {
  const [title, setTitle] = useState('');
  return (
    <div className="">
      {/* 목표 정보 */}
      <div className="mb-16 flex items-center gap-8">
        <div className="h-24 w-24">
          <GoalIcon className="text-goal-red" />
        </div>
        <div className="text-body-b-16 bold text-text-01">디자인 시스템 구축</div>
      </div>
      {/* 할 일 정보 */}
      <div className="mb-24 flex items-center gap-8">
        <div className="flex h-20 w-20 items-center justify-center">
          <TodoIcon className="text-Gray_01" />
        </div>
        <div className="text-body-b-16 text-text-02 font-bold">To do</div>
        <span className="text-body-m-16 text-text-01 font-medium">
          자바스크립트 기초 챕터1 듣기
        </span>
      </div>
      <div className="relative">
        <Input
          variant="noteTitle"
          inputSize="noteTitle"
          text="noteTitle"
          type="text"
          maxLength={MAX_LENGTH}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="노트의 제목을 입력해주세요"
        />
        <div className="absolute top-16 right-0 flex items-center gap-1 text-xs font-medium">
          <span className="text-text-01">{title.length}/</span>
          <span className="text-primary-01">{MAX_LENGTH}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteInfo;
