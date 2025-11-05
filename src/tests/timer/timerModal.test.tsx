// __tests__/timer/timerModal.test.tsx
import React from 'react';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimerWidget from '@/components/timer/TimerWidget';
import { useTimerStore } from '@/store/timerStore';

// ---- timerApi 모킹 -------------------------------------------------
const getCurrentTimerStatus = jest.fn();
const getTotalRunningTime = jest.fn();
const startTimer = jest.fn();
const resumeTimer = jest.fn();
const pauseTimer = jest.fn();
const finishTimer = jest.fn();

jest.mock('@/api/timerApi', () => ({
  timerApi: {
    getCurrentTimerStatus: (...args: any[]) => getCurrentTimerStatus(...args),
    getTotalRunningTime: (...args: any[]) => getTotalRunningTime(...args),
    startTimer: (...args: any[]) => startTimer(...args),
    resumeTimer: (...args: any[]) => resumeTimer(...args),
    pauseTimer: (...args: any[]) => pauseTimer(...args),
    finishTimer: (...args: any[]) => finishTimer(...args),
  },
}));

// ---- goals & 버튼/모달 모킹(간단화) --------------------------------
const mockRefetch = jest.fn();
let mockGoalsData: any = [
  {
    goalId: 'g1',
    title: '공부',
    color: '#ff0000',
    isPinned: false,
    todos: [
      { id: 't1', title: '자료 정리', isDone: false },
      { id: 't2', title: '문제 풀기', isDone: false },
    ],
  },
];

jest.mock('@/hooks/useGoals', () => ({
  useGoals: () => ({
    data: mockGoalsData,
    refetch: mockRefetch,
  }),
}));

jest.mock('@/components/timer/TimerButton', () => ({
  __esModule: true,
  default: (props: any) => (
    <button aria-label="타이머 버튼" onClick={props.onClick}>
      {String(props.minutes).padStart(2, '0')}:{String(props.seconds).padStart(2, '0')}
    </button>
  ),
}));

jest.mock('@/components/timer/SelectTodoModal', () => ({
  __esModule: true,
  default: (props: any) => (
    <div role="dialog" aria-label="선택 모달">
      <p>선택 모달</p>
      <button
        onClick={() => {
          const g = props.goals?.[0];
          const t = g?.todos?.[0];
          props.onSelect?.(g, t);
        }}
      >
        목록에서 하나 선택
      </button>
      <button onClick={props.onClose}>닫기</button>
    </div>
  ),
}));

jest.mock('@/components/timer/TimerModal', () => ({
  __esModule: true,
  default: (props: any) => (
    <div role="dialog" aria-label="타이머 모달">
      <p>타이머 모달</p>
      <button onClick={() => props.onComplete?.(props.todoId)}>완료</button>
      <button onClick={props.onBack}>뒤로가기</button>
      <button onClick={props.onClose}>닫기</button>
    </div>
  ),
}));

// ---- store selector 모킹(실제 스토어 사용: 상태는 그대로 접근) -----
jest.mock('@/store/timerStore', () => {
  const actual = jest.requireActual('@/store/timerStore');
  return {
    __esModule: true,
    ...actual,
  };
});

// 각 테스트 후 DOM/모킹 정리
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('TimerModal/Widget refresh flows', () => {
  beforeEach(() => {
    // 기본: 서버는 실행 중이 아님
    getCurrentTimerStatus.mockResolvedValue({ isRunning: false });
    getTotalRunningTime.mockResolvedValue({ totalRunningTime: '00:00:00' });
  });

  test('정지(stop) 후 새로고침(재렌더) → 위젯 클릭 시 "선택 모달"이 떠야 한다', async () => {
    // 1) 최초 렌더
    const view1 = render(<TimerWidget />);

    // 버튼 클릭 → 선택 모달
    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    expect(await screen.findByRole('dialog', { name: '선택 모달' })).toBeInTheDocument();

    // 하나 선택 → 타이머 모달
    fireEvent.click(screen.getByText('목록에서 하나 선택'));
    expect(await screen.findByRole('dialog', { name: '타이머 모달' })).toBeInTheDocument();

    // 2) stop 된 상태로 스토어 변경
    await act(async () => {
      useTimerStore.setState({
        isRunning: false,
        resumeAtMs: null,
        mainStartAtMs: null,
        mainBaseSec: 0,
        sessionId: null,
      } as any);
    });

    // ✅ 3) 첫 트리 언마운트(이전 모달 DOM 제거)
    view1.unmount();

    // 4) 새로고침 시뮬레이션: 새 렌더
    const view2 = render(<TimerWidget />);
    // ✅ hydrate/useEffect 종료 대기(안정화)
    await screen.findByRole('button', { name: '타이머 버튼' });

    // 5) 다시 클릭 → 선택 모달이어야 함
    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    expect(await screen.findByRole('dialog', { name: '선택 모달' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: '타이머 모달' })).not.toBeInTheDocument();

    view2.unmount();
  });

  test('일시정지(pause) 후 새로고침(재렌더) → 위젯 클릭 시 "선택 모달"이 떠야 한다', async () => {
    // 최초 1회는 running 응답 → 이후는 정지 상태 응답
    getCurrentTimerStatus
      .mockResolvedValueOnce({ isRunning: true, todoId: 1, sessionId: 999 })
      .mockResolvedValue({ isRunning: false });

    const view1 = render(<TimerWidget />);

    // 선택 모달 → 타이머 모달 진입
    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    expect(await screen.findByRole('dialog', { name: '선택 모달' })).toBeInTheDocument();
    fireEvent.click(screen.getByText('목록에서 하나 선택'));
    expect(await screen.findByRole('dialog', { name: '타이머 모달' })).toBeInTheDocument();

    // pause 이후 상태로 조정
    await act(async () => {
      useTimerStore.setState({
        isRunning: false,
        resumeAtMs: null,
        mainStartAtMs: null,
      } as any);
    });

    // ✅ 이전 트리 제거
    view1.unmount();

    // 새로고침 시뮬레이션
    const view2 = render(<TimerWidget />);
    // ✅ 안정화 대기
    await screen.findByRole('button', { name: '타이머 버튼' });

    // 다시 클릭 → 선택 모달이어야 함
    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    expect(await screen.findByRole('dialog', { name: '선택 모달' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: '타이머 모달' })).not.toBeInTheDocument();

    view2.unmount();
  });
});
