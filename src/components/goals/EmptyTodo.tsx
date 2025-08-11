'use client';

import { Button } from '@/components/ui/Button';
import { GoalSummary } from '@/interfaces/goal';
import { getGoalBackgroundColorClass } from '@/lib/goalColors';
import { useModalStore } from '@/store/modalStore';

interface EmptyTodoProps {
  goal: GoalSummary;
}

export default function EmptyTodoMessage({ goal }: EmptyTodoProps) {
  const { openTodoModalWithGoal } = useModalStore();

  return (
    <>
      <div
        className={`absolute top-0 left-0 h-full w-12 ${getGoalBackgroundColorClass(goal.color)}`}
      />
      <div className="relative flex h-full w-full flex-col items-center justify-end px-32 pt-[40px] pb-[68px]">
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
            openTodoModalWithGoal(goal.goalId);
          }}
        >
          + 할 일 만들기
        </Button>
      </div>
    </>
  );
}
