import { goalSummariesRes } from '../goals/goalsResponse';

export const ScheduleRes = goalSummariesRes.goals.flatMap(goal =>
  goal.todos
    .filter(todo => !todo.isDone)
    .map(todo => ({
      todo: {
        todoId: todo.id,
        goalId: goal.goalId,
        title: todo.title,
        isDone: false,
        createdAt: '',
        updatedAt: '',
        accumulatedMs: 0,
        attachment: [], // ✅ 기본값으로 비워둠
        notes: [],       // ✅ 기본값으로 비워둠
      },
      color: `bg-[var(--color-goal-${goal.color})]`,
    }))
);
