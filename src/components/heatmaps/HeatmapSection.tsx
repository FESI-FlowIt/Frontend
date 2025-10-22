'use client';

import { useRef, useState } from 'react';

import SparkleIcon from '@/assets/icons/sparkle.svg';
import HeatmapInfoPopover from '@/components/heatmaps/HeatmapInfoPopover';
import MonthlyHeatmap from '@/components/heatmaps/MonthlyHeatmap';
import WeeklyHeatmap from '@/components/heatmaps/WeeklyHeatmap';
import InsightCard from '@/components/insight/InsightCard';
import Card from '@/components/ui/Card';
import ErrorFallback from '@/components/ui/ErrorFallback';
import { IconButton } from '@/components/ui/IconButton';
import Tab from '@/components/ui/Tab';
import { periodTabs } from '@/constants/heatmap';
import { useHeatmapSection } from '@/hooks/useHeatmapsSection';
import usePopover from '@/hooks/usePopover';

export default function HeatmapSection() {
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const isWeek = period === 'week';

  const {
    weeklyHeatmapData,
    weeklyInsightData,
    monthlyHeatmapData,
    monthlyInsightData,
    hasError,
    handleRetry,
  } = useHeatmapSection(period);

  const infoButtonRef = useRef<HTMLButtonElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const popover = usePopover('heatmap');

  // 이벤트 핸들러
  const handleInfoClick = () => {
    if (infoButtonRef.current) {
      popover.open(infoButtonRef.current, cardContainerRef.current);
    }
  };

  // 히트맵 렌더링
  const renderHeatmap = () => {
    if (isWeek) {
      return <WeeklyHeatmap data={weeklyHeatmapData?.data} />;
    }

    if (!isWeek) {
      return <MonthlyHeatmap data={monthlyHeatmapData?.data} />;
    }

    return null;
  };

  // 인사이트 카드 렌더링
  const renderInsightCard = () => {
    if (period === 'week') {
      if (!weeklyInsightData || !weeklyInsightData.success) {
        return <InsightCard variant="no-data" />;
      }

      // insights가 배열이고 비어있거나, 모든 요소가 빈 문자열인 경우
      if (
        !weeklyInsightData.data.insights ||
        weeklyInsightData.data.insights.length === 0 ||
        weeklyInsightData.data.insights.every(insight => insight.trim() === '')
      ) {
        return <InsightCard variant="no-work-time" />;
      }

      return <InsightCard variant="weekly" item={weeklyInsightData.data.insights} />;
    }

    if (period === 'month') {
      if (!monthlyInsightData || !monthlyInsightData.success) {
        return <InsightCard variant="no-data" />;
      }

      // insights가 배열이고 비어있거나, 모든 요소가 빈 문자열인 경우
      if (
        !monthlyInsightData.data.insights ||
        monthlyInsightData.data.insights.length === 0 ||
        monthlyInsightData.data.insights.every(insight => insight.trim() === '')
      ) {
        return <InsightCard variant="no-work-time" />;
      }

      return <InsightCard variant="monthly" item={monthlyInsightData.data.insights} />;
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
        extra={
          !hasError && (
            <Tab
              items={periodTabs}
              value={period}
              onChange={v => setPeriod(v as 'week' | 'month')}
            />
          )
        }
        backgroundColor="white"
        size="heatmap"
        flexWrapExtra={true}
      >
        {hasError ? (
          // 에러처리
          <div className="flex h-full w-full justify-center">
            <ErrorFallback type="general" title="데이터를 불러올 수 없어요" onRetry={handleRetry} />
          </div>
        ) : (
          // 정상처리
          <div className="flex h-full flex-1 flex-col gap-12">
            <div className="flex flex-shrink-0 justify-center">{renderHeatmap()}</div>
            <div className="flex flex-1">{renderInsightCard()}</div>
          </div>
        )}
      </Card>

      {popover.isOpen && <HeatmapInfoPopover onClose={popover.close} position={popover.position} />}
    </div>
  );
}
