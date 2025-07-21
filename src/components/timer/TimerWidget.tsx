'use client';

import { useEffect, useState } from 'react';
import ClockIcon from '@/assets/icons/clock.svg';
import SelectTodoModal from '@/components/timer/SelectTodoModal';
import { Goal } from '@/interfaces/dashboardgoalInterface';

export default function TimerWidget({ goals }: { goals: Goal[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
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

  const format = (num: number) => String(num).padStart(2, '0');

  const handleWidgetClick = () => {
    if (!isRunning) {
      setIsModalOpen(true);
    }
  };

  const handleSelectTodo = (todoId: string) => {
    console.log('선택된 todo:', todoId);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleWidgetClick}
        className={`fixed right-40 bottom-40 z-50 flex h-100 w-100 flex-col items-center justify-start rounded-full text-white shadow-xl transition-colors ${isRunning ? 'bg-primary-01' : 'bg-timer'}`}
      >
        <div className={`flex flex-col items-center ${isRunning ? 'mt-[13px]' : 'mt-[25px]'}`}>
          <ClockIcon className="h-24 w-24" />
          {isRunning ? (
            <>
              <div className="text-body-sb-20 mt-[4px]">{`${format(minutes)}:${format(seconds)}`}</div>
              <div className="text-body-sb-16">할 일 중</div>
            </>
          ) : (
            <div className="text-body-sb-20 mt-[4px]">할 일 시작</div>
          )}
        </div>
      </button>

      {isModalOpen && (
        <SelectTodoModal
          goals={goals}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelectTodo}
        />
      )}
    </>
  );
}
