'use client';

import { useState } from 'react';

import SelectTodoModal from '@/components/timer/SelectTodoModal';
import TimerButton from '@/components/timer/TimerButton';
import TimerModal from '@/components/timer/TimerModal';
import { useGoalsDashboard } from '@/hooks/useGoalDashboard';
import { GoalSummary } from '@/interfaces/goal';
import { TodoSummary } from '@/interfaces/todo';
import { getGoalTextColorClass } from '@/lib/goalColors';
import { useTimerStore } from '@/store/timerStore';
import { useUserStore } from '@/store/userStore';

export default function TimerWidget() {
  const userId = useUserStore(state => state.user?.id ?? 0);
  const { data: goals = [] } = useGoalsDashboard(userId);

  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalSummary | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<TodoSummary | null>(null);

  const { getTimerState, startTimer, pauseTimer, stopTimer, runningTodoId } = useTimerStore();

  const activeTimerState = runningTodoId ? getTimerState(runningTodoId) : null;
  const selectedTimerState = selectedTodo ? getTimerState(String(selectedTodo.id)) : null;

  const isBlocked: boolean =
    !!activeTimerState?.isRunning && selectedTodo?.id.toString() !== runningTodoId;

  const handleWidgetClick = () => {
    if (activeTimerState?.isRunning && selectedGoal && selectedTodo) {
      setIsTimerModalOpen(true);
    } else {
      setIsSelectModalOpen(true);
    }
  };

  const handleSelectTodo = (goal: GoalSummary, todo: TodoSummary) => {
    setSelectedGoal(goal);
    setSelectedTodo(todo);
    setIsSelectModalOpen(false);
    setIsTimerModalOpen(true);
  };

  return (
    <>
      <TimerButton
        isRunning={activeTimerState?.isRunning || false}
        minutes={activeTimerState?.minutes || 0}
        seconds={activeTimerState?.seconds || 0}
        onClick={handleWidgetClick}
      />

      {isSelectModalOpen && (
        <SelectTodoModal
          goals={goals}
          onClose={() => setIsSelectModalOpen(false)}
          onSelect={handleSelectTodo}
        />
      )}

      {isTimerModalOpen && selectedGoal && selectedTodo && selectedTimerState && (
        <TimerModal
          isRunning={selectedTimerState.isRunning}
          isBlocked={isBlocked}
          onStart={() => startTimer(String(selectedTodo.id))}
          onPause={() => pauseTimer(String(selectedTodo.id))}
          onStop={() => stopTimer(String(selectedTodo.id))}
          onClose={() => setIsTimerModalOpen(false)}
          onBack={() => {
            setIsTimerModalOpen(false);
            setIsSelectModalOpen(true);
          }}
          goalTitle={selectedGoal.title}
          goalColor={getGoalTextColorClass(selectedGoal.color)}
          todoContent={selectedTodo.title}
          todoId={String(selectedTodo.id)}
          minutes={selectedTimerState.minutes}
          seconds={selectedTimerState.seconds}
          accumulatedSeconds={selectedTimerState.accumulatedSeconds}
        />
      )}
    </>
  );
}
