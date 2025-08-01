'use client';

import Image from 'next/image';
import { useModalStore } from '@/store/modalStore';

import { Button } from '@/components/ui/Button';
import GoalModal from '../goals/GoalModal';

export default function NoGoalsGuide() {
  const { openGoalModal } = useModalStore();

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-16 h-140 w-140 md:h-200 md:w-200">
        <Image
          src="/assets/images/landing_img.svg"
          alt="랜딩페이지 이미지"
          fill
          className="object-contain"
        />
      </div>

      <p className="text-text-04 text-body-m-20 mb-20 text-center">
        목표를 만들어
        <br />
        세부 할 일을 추가해봐요
      </p>

      <Button
        type="button"
        size="addgoal"
        variant="default"
        text="default"
        disabled={false}
        onClick={openGoalModal}
      >
        + 목표 만들기
      </Button>

      <GoalModal />
    </div>
  );
}
