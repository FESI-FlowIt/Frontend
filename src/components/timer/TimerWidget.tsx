'use client';

import { useState } from 'react';

import SelectTodoModal from '@/components/timer/SelectTodoModal';
import TimerButton from '@/components/timer/TimerButton';
import TimerModal from '@/components/timer/TimerModal';
import { useTimerControl } from '@/hooks/useTimerControl';
import { GoalSummary, Todo } from '@/interfaces/dashboardgoalInterface';

export default function TimerWidget({ goals }: { goals: GoalSummary[] }) {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalSummary | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const {
    isRunning,
    minutes,
    seconds,
    accumulatedSeconds,
    handleStart,
    handlePause,
    handleStop,
    setMinutes,
    setSeconds,
    setAccumulatedSeconds,
  } = useTimerControl();

  const handleWidgetClick = () => {
    if (isRunning && selectedGoal && selectedTodo) {
      setIsTimerModalOpen(true);
    } else {
      setIsSelectModalOpen(true);
    }
  };

  const handleSelectTodo = (goal: GoalSummary, todo: Todo) => {
    setSelectedGoal(goal);
    setSelectedTodo(todo);
    setMinutes(0);
    setSeconds(0);
    setAccumulatedSeconds(0);
    setIsSelectModalOpen(false);
    setIsTimerModalOpen(true);
  };

  return (
    <>
      <TimerButton
        isRunning={isRunning}
        minutes={minutes}
        seconds={seconds}
        onClick={handleWidgetClick}
      />

      {isSelectModalOpen && (
        <SelectTodoModal
          goals={goals}
          onClose={() => setIsSelectModalOpen(false)}
          onSelect={handleSelectTodo}
        />
      )}

      {isTimerModalOpen && selectedGoal && selectedTodo && (
        <TimerModal
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onClose={() => setIsTimerModalOpen(false)}
          onBack={() => {
            setIsTimerModalOpen(false);
            setIsSelectModalOpen(true);
          }}
          goalTitle={selectedGoal.title}
          goalColor={selectedGoal.color}
          todoContent={selectedTodo.content}
          todoId={selectedTodo.id}
          minutes={minutes}
          seconds={seconds}
          accumulatedSeconds={accumulatedSeconds}
        />
      )}
    </>
  );
}
