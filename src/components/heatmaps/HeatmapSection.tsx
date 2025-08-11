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
import usePopover from '@/hooks/usePopover';
import { getCurrentDate, getCurrentMonth } from '@/lib/calendar';

export default function HeatmapSection() {
  const [period, setPeriod] = useState('week');

  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const popover = usePopover('heatmap');

  // 이벤트 핸들러
  const handleInfoClick = () => {
    if (infoButtonRef.current) {
      popover.open(infoButtonRef.current, cardContainerRef.current);
    }
  };

  // API 호출
  const { data: weeklyHeatmapData } = useWeeklyHeatmap(getCurrentDate());
  const { data: monthlyHeatmapData } = useMonthlyHeatmap(getCurrentMonth());
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

      {popover.isOpen && <HeatmapInfoPopover onClose={popover.close} position={popover.position} />}
    </div>
  );
}
