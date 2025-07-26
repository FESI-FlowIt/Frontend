'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';

export default function EmptyTodoMessage({ goalId }: { goalId: string }) {
  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col items-center justify-end px-32 pt-[40px] pb-[68px]">
      <p className="text-text-02 text-body-sb-20 mb-32 text-center leading-[34px]">
        목표를 이루기 위해
        <br />할 일을 생성해볼까요?
      </p>
      <Button
        size="emptytodoCard"
        variant="snackbar"
        text="todoCard"
        type="button"
        disabled={false}
        onClick={e => {
          e.stopPropagation();
          router.push(`/goals/${goalId}/todos/create`);
        }}
      >
        + 할 일 만들기
      </Button>
    </div>
  );
}
