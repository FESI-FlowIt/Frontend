'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import GoalIcon from '@/assets/icons/goal.svg';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalTextColorClass } from '@/lib/goalColorUtils';
import { ROUTES } from '@/lib/routes';

import EmptyTodo from './EmptyTodo';
import GoalCardContent from './GoalCardContent';
import NoGoalsGuide from './NoGoalsGuide';

export default function GoalListDashboardCard({ goal }: { goal: GoalSummary | null }) {
  const router = useRouter();
  const [todos, setTodos] = useState<TodoSummary[]>(goal?.todos ?? []);

  useEffect(() => {
    if (goal) setTodos(goal.todos);
  }, [goal]);

  const handleToggle = (id: number) => {
    setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  if (!goal) {
    return <NoGoalsGuide />;
  }

  if (todos.length === 0) {
    return (
      <div
        className="rounded-20 relative flex h-340 w-303 cursor-pointer flex-col overflow-hidden bg-white md:w-596 lg:w-480"
        onClick={() => {
          router.push(ROUTES.GOALS.DETAIL(String(goal.goalId)));
        }}
      >
        <div className="flex flex-1 flex-col justify-between px-32 pt-20 pb-20">
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-8">
              <GoalIcon
                className={getGoalTextColorClass(goal.color)}
                width={24}
                height={24}
                fill="currentColor"
              />
              <h3 className="text-text-01 text-body-sb-20 max-w-296 truncate">{goal.title}</h3>
            </div>
            <div className="flex items-baseline gap-12">
              <h3 className="text-text-01 text-body-sb-20">D-{goal.dDay}</h3>
              <span className="text-body-m-16 text-text-03">({goal.deadlineDate} 마감)</span>
            </div>
          </div>

          <EmptyTodo goal={goal} />
        </div>
      </div>
    );
  }

  return <GoalCardContent goal={goal} todos={todos} onToggle={handleToggle} />;
}
