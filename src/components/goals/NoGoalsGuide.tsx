'use client';

import NogoalIcon from '@/assets/icons/nogoal.svg';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export default function NoGoalsGuide() {
  const router = useRouter();

  return (
    <div className="rounded-16 flex h-full w-full flex-col items-center justify-center bg-white py-60">
      <div className="flex flex-col items-center">
        <NogoalIcon className="mb-16 h-200 w-200" />
        <p className="text-text-04 text-body-m-20 mb-20 text-center">
          목표를 만들어
          <br />
          세부 할 일을 추가해봐요!
        </p>
        <Button
          type="button"
          size="addgoal"
          variant="default"
          text="default"
          onClick={() => router.push('/goals/create')}
        >
          + 목표 만들기
        </Button>
      </div>
    </div>
  );
}
