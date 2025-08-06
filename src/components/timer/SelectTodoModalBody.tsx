'use client';

import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalTextColorClass } from '@/lib/goalColors';

import SelectTodoModalEmpty from './SelectTodoModalEmpty';

interface BodyProps {
  goals: GoalSummary[];
  allTodosEmpty: boolean;
  selectedGoalId: string | null;
  setSelectedGoalId: React.Dispatch<React.SetStateAction<string | null>>;
  onSelect: (goal: GoalSummary, todo: TodoSummary) => void;
}

export default function SelectTodoModalBody({
  goals,
  allTodosEmpty,
  selectedGoalId,
  setSelectedGoalId,
  onSelect,
}: BodyProps) {
  if (allTodosEmpty) return <SelectTodoModalEmpty />;

  return (
    <div className="min-h-0 flex-1 space-y-12 overflow-y-auto pr-16">
      {goals.map(goal => {
        const isSelected = selectedGoalId === String(goal.goalId);
        return (
          <div
            key={goal.goalId}
            className="border-background w-full rounded-xl border bg-white px-20 py-20"
          >
            <button
              className="flex w-full cursor-pointer items-center justify-between text-left"
              onClick={() =>
                setSelectedGoalId(prev =>
                  prev === goal.goalId.toString() ? null : goal.goalId.toString(),
                )
              }
            >
              <span className="text-body-m-20 text-text-02 flex items-center gap-12">
                <span className={`h-12 w-12 rounded-full ${getGoalTextColorClass(goal.color)}`} />
                {goal.title}
              </span>
              <span className="text-gray-500">{isSelected ? '▲' : '▼'}</span>
            </button>

            {isSelected && (
              <div className="bg-line mt-16 flex flex-col gap-12 rounded-lg p-12">
                {goal.todos.map(todo => (
                  <button
                    key={todo.id}
                    onClick={() => {
                      onSelect(goal, todo);
                      setSelectedGoalId(null);
                    }}
                    className="text-body-long-16 w-full cursor-pointer rounded-md bg-white px-16 py-12 text-left"
                  >
                    {todo.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
