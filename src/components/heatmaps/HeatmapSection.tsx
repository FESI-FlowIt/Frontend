'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';

import HeatmapInfoPopover from '@/components/heatmaps/HeatmapInfoPopover';
import MonthlyHeatmap from '@/components/heatmaps/MonthlyHeatmap';
import WeeklyHeatmap from '@/components/heatmaps/WeeklyHeatmap';
import InsightCard from '@/components/insight/InsightCard';
import Card from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import Tab from '@/components/ui/Tab';
import { periodTabs } from '@/constants/heatmap';
import { useMonthlyHeatmap, useWeeklyHeatmap } from '@/hooks/useHeatmap';
import { useMonthlyInsight, useWeeklyInsight } from '@/hooks/useInsight';

export default function HeatmapSection() {
  const [period, setPeriod] = useState('week');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  const handleInfoClick = () => {
    if (!infoButtonRef.current) return;

    const rect = infoButtonRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // 팝오버 예상 너비 (주간 + 월간 범례 + 간격)
    const popoverWidth = 320;

    // 버튼의 중앙점 계산
    const buttonCenterX = rect.left + rect.width / 2;

    // 팝오버 왼쪽 위치 계산 (버튼 중앙선과 팝오버 중앙선 일치)
    let popoverLeft = scrollLeft + buttonCenterX - popoverWidth / 2;

    // 화면 경계 체크
    const viewportWidth = window.innerWidth;
    const margin = 16; // 화면 가장자리 여백

    if (popoverLeft < margin) {
      popoverLeft = margin; // 왼쪽 경계
    } else if (popoverLeft + popoverWidth > viewportWidth - margin) {
      popoverLeft = viewportWidth - popoverWidth - margin; // 오른쪽 경계
    }

    setPopoverPosition({
      top: rect.bottom + scrollTop + 8, // 버튼 아래쪽 + 8px 간격
      left: popoverLeft,
    });

    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const { data: weeklyHeatmapData } = useWeeklyHeatmap();
  const { data: monthlyHeatmapData } = useMonthlyHeatmap();
  const { data: weeklyInsightData } = useWeeklyInsight();
  const { data: monthlyInsightData } = useMonthlyInsight();

  // 히트맵 렌더링
  const renderHeatmap = () => {
    if (period === 'week' && weeklyHeatmapData) {
      return <WeeklyHeatmap data={weeklyHeatmapData.data} />;
    }

    if (period === 'month' && monthlyHeatmapData) {
      return <MonthlyHeatmap data={monthlyHeatmapData.data} />;
    }

    return null;
  };

  // 인사이트 카드 렌더링
  const renderInsightCard = () => {
    if (period === 'week') {
      return weeklyInsightData?.success && weeklyInsightData.data.insights.length > 0 ? (
        <InsightCard variant="weekly" items={weeklyInsightData.data.insights} />
      ) : (
        <InsightCard variant="empty" />
      );
    }

    if (period === 'month') {
      return monthlyInsightData?.success && monthlyInsightData.data.insights.length > 0 ? (
        <InsightCard variant="monthly" items={monthlyInsightData.data.insights} />
      ) : (
        <InsightCard variant="empty" />
      );
    }

    return null;
  };

  const cardTitle = (
    <div className="flex items-center gap-8">
      <span>작업 시간 분석</span>
      <div className="relative">
        <IconButton
          ref={infoButtonRef}
          variant="info"
          onClick={handleInfoClick}
          aria-label="작업 시간 분석 정보"
        />
      </div>
    </div>
  );

  return (
    <div>
      <Card
        icon={
          <Image src="/assets/icons/sparkleIcon.svg" alt="스파클 아이콘" width={24} height={24} />
        }
        title={cardTitle}
        extra={<Tab items={periodTabs} value={period} onChange={setPeriod} />}
        backgroundColor="white"
        size="heatmap"
        flexWrapExtra={true}
      >
        <div className="mt-34 flex flex-col gap-22">
          <div className="flex justify-center">{renderHeatmap()}</div>
          {renderInsightCard()}
        </div>
      </Card>

      {isPopoverOpen && (
        <HeatmapInfoPopover onClose={handlePopoverClose} position={popoverPosition} />
      )}
    </div>
  );
}
