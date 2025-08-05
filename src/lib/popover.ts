import { PopoverPosition } from '@/interfaces/popover';

// 기본 위치 정보 계산
const getBasePosition = (triggerRect: DOMRect, offset = 8) => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  return {
    scrollLeft,
    baseTop: scrollTop + triggerRect.bottom + offset,
  };
};

// 뷰포트 경계 검사 및 조정
const adjustForBoundaries = (left: number, width: number, margin = 16): number => {
  const viewportWidth = window.innerWidth;

  if (left < margin) return margin;
  if (left + width > viewportWidth - margin) return viewportWidth - width - margin;
  return left;
};

// X 좌표 계산 전략들
const calculateXPosition = {
  // 버튼 중앙 기준
  buttonCentered: (triggerRect: DOMRect, popoverWidth: number, scrollLeft: number): number => {
    const buttonCenterX = triggerRect.left + triggerRect.width / 2;
    return scrollLeft + buttonCenterX - popoverWidth / 2;
  },

  // 컨테이너 중앙 기준
  containerCentered: (containerRect: DOMRect, popoverWidth: number, scrollLeft: number): number => {
    const containerCenterX = containerRect.left + containerRect.width / 2;
    return scrollLeft + containerCenterX - popoverWidth / 2;
  },
};

// 히트맵 팝오버 위치 계산
export const calculateHeatmapPosition = (
  triggerElement: HTMLElement,
  containerElement?: HTMLElement | null,
): PopoverPosition => {
  const triggerRect = triggerElement.getBoundingClientRect();
  const popoverWidth = 320;
  const { scrollLeft, baseTop } = getBasePosition(triggerRect);

  let leftPosition: number;

  // 모바일에서는 컨테이너 중앙, PC에서는 버튼 중앙
  const isMobile = window.innerWidth < 744;

  if (isMobile && containerElement) {
    const containerRect = containerElement.getBoundingClientRect();
    leftPosition = calculateXPosition.containerCentered(containerRect, popoverWidth, scrollLeft);
  } else {
    leftPosition = calculateXPosition.buttonCentered(triggerRect, popoverWidth, scrollLeft);
  }

  return {
    top: baseTop,
    left: adjustForBoundaries(leftPosition, popoverWidth),
  };
};

// 캘린더 팝오버 위치 계산
export const calculateCalendarPosition = (
  triggerElement: HTMLElement,
  containerElement: HTMLElement,
): PopoverPosition => {
  const triggerRect = triggerElement.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();
  const popoverWidth = window.innerWidth >= 744 ? 520 : 343;
  const { scrollLeft, baseTop } = getBasePosition(triggerRect);

  // 컨테이너(그리드) 중앙 기준으로 계산
  const leftPosition = calculateXPosition.containerCentered(
    containerRect,
    popoverWidth,
    scrollLeft,
  );

  return {
    top: baseTop,
    left: adjustForBoundaries(leftPosition, popoverWidth),
  };
};
