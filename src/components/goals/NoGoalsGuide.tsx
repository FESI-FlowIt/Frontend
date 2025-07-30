'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';

export default function NoGoalsGuide() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <Image src="/assets/images/landing_img.svg" alt="설명" width={200} height={200} />

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
        onClick={() => router.push('/goals/create')}
      >
        + 목표 만들기
      </Button>
    </div>
  );
}
