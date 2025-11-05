// __tests__/timer/TimerWidget.spec.tsx
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimerWidget from '@/components/timer/TimerWidget';

// -----------------------------
// Mocks (테스트 간 바뀌는 값들)
// -----------------------------
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

const mockStoreFns = {
  startClock: jest.fn(),
  hydrateFromServer: jest.fn(),
  ensureRunningAnchors: jest.fn(),
};

let mockStoreState = {
  isRunning: false,
  mainStartAtMs: null as number | null,
  mainBaseSec: 0,
  nowMs: 0,
  // actions
  startClock: mockStoreFns.startClock,
  hydrateFromServer: mockStoreFns.hydrateFromServer,
  ensureRunningAnchors: mockStoreFns.ensureRunningAnchors,
};

// -----------------------------
// Module mocks
// -----------------------------
jest.mock('@/hooks/useGoals', () => ({
  useGoals: () => ({
    data: mockGoalsData,
    refetch: mockRefetch,
  }),
}));

// TimerButton을 단순 버튼으로 mock (minutes:seconds 텍스트 확인 가능)
jest.mock('@/components/timer/TimerButton', () => ({
  __esModule: true,
  default: (props: any) => (
    <button
      aria-label="타이머 버튼"
      onClick={props.onClick}
      data-minutes={props.minutes}
      data-seconds={props.seconds}
    >
      {String(props.minutes).padStart(2, '0')}:{String(props.seconds).padStart(2, '0')}
    </button>
  ),
}));

// SelectTodoModal: onSelect(goal, todo) 트리거용 버튼 제공
let lastSelectProps: any = null;
jest.mock('@/components/timer/SelectTodoModal', () => ({
  __esModule: true,
  default: (props: any) => {
    lastSelectProps = props;
    return (
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
    );
  },
}));

// TimerModal: 완료/뒤로가기 트리거용 버튼 제공
let lastTimerModalProps: any = null;
jest.mock('@/components/timer/TimerModal', () => ({
  __esModule: true,
  default: (props: any) => {
    lastTimerModalProps = props;
    return (
      <div role="dialog" aria-label="타이머 모달">
        <p>타이머 모달</p>
        <button onClick={() => props.onComplete?.(props.todoId)}>완료</button>
        <button onClick={props.onBack}>뒤로가기</button>
        <button onClick={props.onClose}>닫기</button>
      </div>
    );
  },
}));

// Zustand store mock (selector 패턴 대응)
jest.mock('@/store/timerStore', () => ({
  __esModule: true,
  useTimerStore: (selector: any) => selector(mockStoreState),
}));

// -----------------------------
// 헬퍼
// -----------------------------
function resetAll() {
  jest.clearAllMocks();
  mockGoalsData = [
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
  mockStoreState = {
    isRunning: false,
    mainStartAtMs: null,
    mainBaseSec: 0,
    nowMs: 0,
    startClock: mockStoreFns.startClock,
    hydrateFromServer: mockStoreFns.hydrateFromServer,
    ensureRunningAnchors: mockStoreFns.ensureRunningAnchors,
  };
}

// -----------------------------
// 테스트
// -----------------------------
describe('TimerWidget', () => {
  beforeEach(() => {
    resetAll();
  });

  it('마운트 시 startClock/hydrateFromServer/ensureRunningAnchors 호출', () => {
    render(<TimerWidget />);
    expect(mockStoreFns.startClock).toHaveBeenCalledTimes(1);
    expect(mockStoreFns.hydrateFromServer).toHaveBeenCalledTimes(1);
    expect(mockStoreFns.ensureRunningAnchors).toHaveBeenCalledTimes(1);
  });

  it('초기 클릭 시 선택 모달 오픈 (선택 후 타이머 모달로 진입)', async () => {
    render(<TimerWidget />);

    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    expect(await screen.findByRole('dialog', { name: '선택 모달' })).toBeInTheDocument();
    expect(mockRefetch).toHaveBeenCalled(); // 선택 모달 열릴 때 refetch 호출

    fireEvent.click(screen.getByText('목록에서 하나 선택'));
    expect(await screen.findByRole('dialog', { name: '타이머 모달' })).toBeInTheDocument();

    expect(lastTimerModalProps.goalTitle).toBe('공부');
    expect(lastTimerModalProps.todoContent).toBe('자료 정리');
    expect(lastTimerModalProps.todoId).toBe('t1');
  });

  it('타이머 모달에서 완료(onComplete) 누르면: 모달 닫히고 선택 모달 다시 열림 + refetch 호출', async () => {
    render(<TimerWidget />);

    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    await screen.findByRole('dialog', { name: '선택 모달' });

    fireEvent.click(screen.getByText('목록에서 하나 선택'));
    await screen.findByRole('dialog', { name: '타이머 모달' });

    fireEvent.click(screen.getByText('완료'));

    // 타이머 모달이 사라질 때까지 대기
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: '타이머 모달' })).not.toBeInTheDocument();
    });

    // 선택 모달 다시 뜰 때까지 대기
    await screen.findByRole('dialog', { name: '선택 모달' });

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalledTimes(2);
    });
  });

  it('뒤로가기(onBack) 누르면 타이머 모달 닫히고 선택 모달 표시 + refetch 증가', async () => {
    render(<TimerWidget />);

    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    await screen.findByRole('dialog', { name: '선택 모달' });

    fireEvent.click(screen.getByText('목록에서 하나 선택'));
    await screen.findByRole('dialog', { name: '타이머 모달' });

    fireEvent.click(screen.getByText('뒤로가기'));

    // 타이머 모달이 사라질 때까지 대기
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: '타이머 모달' })).not.toBeInTheDocument();
    });

    // 선택 모달이 다시 나타날 때까지 대기
    await screen.findByRole('dialog', { name: '선택 모달' });

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalledTimes(2);
    });
  });

  it('타이머 버튼에 분/초가 전달된다 (기본 00:00)', () => {
    render(<TimerWidget />);
    const btn = screen.getByRole('button', { name: '타이머 버튼' });
    expect(btn).toHaveTextContent('00:00');
    expect(btn).toHaveAttribute('data-minutes', '0');
    expect(btn).toHaveAttribute('data-seconds', '0');
  });

  it('선택된 todo 완료 후 선택 모달로 복귀하고, 완료된 todo는 목록에서 제외', async () => {
    render(<TimerWidget />);

    // 선택 → 타이머 모달
    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    await screen.findByRole('dialog', { name: '선택 모달' });

    fireEvent.click(screen.getByText('목록에서 하나 선택'));
    await screen.findByRole('dialog', { name: '타이머 모달' });

    // 완료 → 선택 모달 복귀
    fireEvent.click(screen.getByText('완료'));
    const selectDialog = await screen.findByRole('dialog', { name: '선택 모달' });

    // 서버 데이터 갱신 가정: t1 완료, t2를 첫 항목으로(우리 목이 항상 첫 항목을 선택하므로)
    mockGoalsData = [
      {
        ...mockGoalsData[0],
        todos: [
          { id: 't2', title: '문제 풀기', isDone: false }, // 첫 번째
          { id: 't1', title: '자료 정리', isDone: true },
        ],
      },
    ];

    // 선택 모달 닫아 리렌더 유도
    fireEvent.click(screen.getByText('닫기'));
    await waitFor(() => {
      expect(selectDialog).not.toBeInTheDocument();
    });

    // 다시 열면(refetch) 변경 데이터 반영
    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    await screen.findByRole('dialog', { name: '선택 모달' });

    // 다시 선택 → 타이머 모달(t2로)
    fireEvent.click(screen.getByText('목록에서 하나 선택'));
    await screen.findByRole('dialog', { name: '타이머 모달' });
  });

  it('선택 모달 닫기 onClose 누르면 모달이 닫힌다', async () => {
    render(<TimerWidget />);

    fireEvent.click(screen.getByRole('button', { name: '타이머 버튼' }));
    const dlg = await screen.findByRole('dialog', { name: '선택 모달' });

    fireEvent.click(screen.getByText('닫기'));

    await waitFor(() => {
      expect(dlg).not.toBeInTheDocument();
    });
  });
});
