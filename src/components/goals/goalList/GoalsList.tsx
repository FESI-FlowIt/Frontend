import React, { useEffect, useRef, useState } from 'react';

import { GoalSummary } from '@/interfaces/goal';

import GoalCard from './GoalCard';

interface GoalsListProps {
  goals: GoalSummary[];
}

const CARD_GAP = 32; // gap-32
const CARD_MIN_WIDTH = 480; // GoalCard의 max-w-480 기준

//브라우저 리사이징 반응형 대응
const useResponsiveColumns = (minWidth: number, gap: number) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    //최대 컬럼 수 계산
    const updateColumns = (containerWidth: number) => {
      const maxColumns = Math.floor((containerWidth + gap) / (minWidth + gap));
      setColumns(Math.max(1, maxColumns));
    };

    const resizeObserver = new ResizeObserver(entries => {
      const [entry] = entries;
      if (entry) {
        updateColumns(entry.contentRect.width);
      }
    });

    if (containerRef.current) {
      updateColumns(containerRef.current.offsetWidth);
      // ResizeObserver로 컨테이너 크기 변화 감지
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [minWidth, gap]);

  return { containerRef, columns };
};

const GoalsList = ({ goals }: GoalsListProps) => {
  const { containerRef, columns } = useResponsiveColumns(CARD_MIN_WIDTH, CARD_GAP);

  return (
    <div
      ref={containerRef}
      className="grid max-w-1504 justify-center gap-32"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 480px))`,
      }}
    >
      {goals.map(goal => (
        <GoalCard key={goal.goalId} goal={goal} />
      ))}
    </div>
  );
};

export default GoalsList;
