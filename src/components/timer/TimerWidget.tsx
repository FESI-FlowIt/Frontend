'use client';

import { useEffect, useState } from 'react';
import TimerIcon from '@/../public/assets/icons/timerIcon.svg';
import SelectTodoModal from '@/components/timer/SelectTodoModal';
import TimerModal from '@/components/timer/TimerModal';
import { Goal, Todo } from '@/interfaces/dashboardgoalInterface';
import { formatNumber } from '@/lib/format';

export default function TimerWidget({ goals }: { goals: Goal[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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
    if (!isRunning) {
      setIsModalOpen(true);
    }
  };

  const handleSelectTodo = (goal: Goal, todo: Todo) => {
    setSelectedGoal(goal);
    setSelectedTodo(todo);
    setMinutes(0);
    setSeconds(0);
    setIsModalOpen(false); // ✅ 여기서 바로 시작하지 않음 (모달에서 시작버튼 클릭 시 시작)
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <>
      {/* 타이머 위젯 버튼 */}
      <button
        onClick={handleWidgetClick}
        className={`fixed right-40 bottom-40 z-50 flex h-100 w-100 flex-col items-center justify-start rounded-full text-white shadow-xl transition-colors ${
          isRunning ? 'bg-primary-01' : 'bg-timer'
        }`}
      >
        <div className={`flex flex-col items-center ${isRunning ? 'mt-[13px]' : 'mt-[25px]'}`}>
          <TimerIcon className="h-24 w-24" />
          {isRunning ? (
            <>
              <div className="text-body-sb-20 mt-[4px]">
                {`${formatNumber(minutes)}:${formatNumber(seconds)}`}
              </div>
              <div className="text-body-sb-16">할 일 중</div>
            </>
          ) : (
            <div className="text-body-sb-20 mt-[4px]">할 일 시작</div>
          )}
        </div>
      </button>

      {/* 할 일 선택 모달 */}
      {isModalOpen && (
        <SelectTodoModal
          goals={goals}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelectTodo}
        />
      )}

      {/* 타이머 모달 */}
      {selectedGoal && selectedTodo && (
        <TimerModal
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onClose={() => {
            setIsRunning(false);
            setSelectedGoal(null);
            setSelectedTodo(null);
          }}
          onBack={() => {
            setIsRunning(false);
            setIsModalOpen(true);
          }}
          goalTitle={selectedGoal.title}
          goalColor={selectedGoal.color}
          todoContent={selectedTodo.content}
          todoId={selectedTodo.id}
        />
      )}
    </>
  );
}
