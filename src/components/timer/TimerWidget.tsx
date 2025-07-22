'use client';

import { useEffect, useState } from 'react';
import SelectTodoModal from '@/components/timer/SelectTodoModal';
import TimerModal from '@/components/timer/TimerModal';
import TimerButton from '@/components/timer/TimerButton';
import { GoalSummary, Todo } from '@/interfaces/dashboardgoalInterface';

export default function TimerWidget({ goals }: { goals: GoalSummary[] }) {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalSummary | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [accumulatedSeconds, setAccumulatedSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 59) {
          setMinutes(min => min + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

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

  const handleStart = () => setIsRunning(true);

  const handlePause = () => {
    // 일시정지 시 누적 시간 합산
    const currentElapsed = minutes * 60 + seconds;
    setAccumulatedSeconds(prev => prev + currentElapsed);
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  const handleStop = () => {
    // 정지 시 누적 시간 합산
    const currentElapsed = minutes * 60 + seconds;
    setAccumulatedSeconds(prev => prev + currentElapsed);
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
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
