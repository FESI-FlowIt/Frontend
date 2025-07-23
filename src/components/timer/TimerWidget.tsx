'use client';

import { useState, useEffect } from 'react';

import SelectTodoModal from '@/components/timer/SelectTodoModal';
import TimerButton from '@/components/timer/TimerButton';
import TimerModal from '@/components/timer/TimerModal';
import { useTimerStore } from '@/store/timerStore';
import { GoalSummary, Todo } from '@/interfaces/dashboardgoalInterface';

export default function TimerWidget({ goals }: { goals: GoalSummary[] }) {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalSummary | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const { getTimerState, startTimer, pauseTimer, stopTimer, runningTodoId } = useTimerStore();

  const activeTimerState = runningTodoId ? getTimerState(runningTodoId) : null;
  const selectedTimerState = selectedTodo ? getTimerState(selectedTodo.id) : null;

  const isBlocked: boolean = !!activeTimerState?.isRunning && selectedTodo?.id !== runningTodoId;

  useEffect(() => {
    console.log('🔍 [DEBUG] isBlocked:', isBlocked);
    console.log('🔍 [DEBUG] selectedTodo.id:', selectedTodo?.id);
    console.log('🔍 [DEBUG] runningTodoId:', runningTodoId);
    console.log('🔍 [DEBUG] activeTimerState?.isRunning:', activeTimerState?.isRunning);
  }, [isBlocked, selectedTodo?.id, runningTodoId, activeTimerState?.isRunning]);

  const handleWidgetClick = () => {
    if (activeTimerState?.isRunning && selectedGoal && selectedTodo) {
      setIsTimerModalOpen(true);
    } else {
      setIsSelectModalOpen(true);
    }
  };

  const handleSelectTodo = (goal: GoalSummary, todo: Todo) => {
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
          onStart={() => startTimer(selectedTodo.id)}
          onPause={() => pauseTimer(selectedTodo.id)}
          onStop={() => stopTimer(selectedTodo.id)}
          onClose={() => setIsTimerModalOpen(false)}
          onBack={() => {
            setIsTimerModalOpen(false);
            setIsSelectModalOpen(true);
          }}
          goalTitle={selectedGoal.title}
          goalColor={selectedGoal.color}
          todoContent={selectedTodo.content}
          todoId={selectedTodo.id}
          minutes={selectedTimerState.minutes}
          seconds={selectedTimerState.seconds}
          accumulatedSeconds={selectedTimerState.accumulatedSeconds}
        />
      )}
    </>
  );
}
