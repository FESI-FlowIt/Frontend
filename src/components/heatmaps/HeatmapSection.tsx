'use client';

import { useRef, useState } from 'react';

import SparkleIcon from '@/assets/icons/sparkle.svg';
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
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const handleInfoClick = () => {
    if (!infoButtonRef.current) return;

    const buttonRect = infoButtonRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    const popoverWidth = 320;
    const isMobile = window.innerWidth < 744;

    let popoverLeft: number;
    let popoverTop: number;

    if (isMobile) {
      // 모바일: Card 섹션의 세로 중앙선에 맞춤
      if (cardContainerRef.current) {
        const cardRect = cardContainerRef.current.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        popoverLeft = scrollLeft + cardCenterX - popoverWidth / 2;

        // 모바일에서도 최소한의 경계 검사
        const margin = 16;
        if (popoverLeft < margin) {
          popoverLeft = margin;
        } else if (popoverLeft + popoverWidth > window.innerWidth - margin) {
          popoverLeft = window.innerWidth - popoverWidth - margin;
        }
      } else {
        // fallback: 화면 중앙
        popoverLeft = scrollLeft + (window.innerWidth - popoverWidth) / 2;
      }

      popoverTop = scrollTop + buttonRect.bottom + 8;
    } else {
      // PC/Tablet: 기존 로직 (버튼 중앙 기준 + 경계 검사)
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      popoverLeft = scrollLeft + buttonCenterX - popoverWidth / 2;

      // 화면 경계 체크
      const viewportWidth = window.innerWidth;
      const margin = 16;

      if (popoverLeft < margin) {
        popoverLeft = margin;
      } else if (popoverLeft + popoverWidth > viewportWidth - margin) {
        popoverLeft = viewportWidth - popoverWidth - margin;
      }

      popoverTop = scrollTop + buttonRect.bottom + 8;
    }

    setPopoverPosition({ top: popoverTop, left: popoverLeft });
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
    <div ref={cardContainerRef}>
      <Card
        icon={<SparkleIcon className="text-gray-01" width={24} height={24} fill="currentColor" />}
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
