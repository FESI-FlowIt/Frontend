import { http, HttpResponse } from 'msw';

import { GoalSummary } from '@/interfaces/dashboardgoalInterface';
import { CreateGoalRequest, UpdateGoalRequest } from '@/interfaces/goal';
import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

import { createStorage } from '../utils/storage';

// localStorage를 활용한 목표 데이터 저장소
const STORAGE_KEY = 'goals';
const goalStorage = createStorage<GoalSummary>(STORAGE_KEY, goalSummariesRes);

// localStorage에서 목표 데이터 불러오기
const getStoredGoals = (): GoalSummary[] => {
  const storedGoals = goalStorage.load();
  // localStorage가 비어있으면 초기 데이터로 설정
  if (storedGoals.length === 0) {
    goalStorage.save(goalSummariesRes);
    return goalSummariesRes;
  }
  return storedGoals;
};

// localStorage에 목표 데이터 저장
const saveGoalsToStorage = (goals: GoalSummary[]) => {
  goalStorage.save(goals);
};

export const goalHandlers = [
  http.get('/goals', async () => {
    const isSuccess = true;

    if (isSuccess) {
      return HttpResponse.json(goalSummariesRes);
    }

    return HttpResponse.json({ message: '목표 데이터를 불러오지 못했습니다.' }, { status: 500 });
  }),

  http.patch('/goals/:goalId', async ({ params, request }) => {
    const { goalId } = params;
    const body = (await request.json()) as { isPinned: boolean };

    const goal = goalSummariesRes.find(g => g.goalId === goalId);
    if (!goal) {
      return HttpResponse.json({ message: '목표를 찾을 수 없습니다.' }, { status: 404 });
    }

    goal.isPinned = body.isPinned;

    return HttpResponse.json(goal);
  }),

  // 목표 생성
  http.post('/goals', async ({ request }) => {
    const body = (await request.json()) as CreateGoalRequest;

    const newGoal = {
      goalId: `goal-${Date.now()}`,
      title: body.title,
      color: body.color,
      dueDate: body.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      progress: 0,
      todos: [],
    };

    // localStorage에서 현재 목표 데이터 가져오기
    const currentGoals = getStoredGoals();

    // Dashboard용 format으로 변환하여 추가
    const newGoalSummary: GoalSummary = {
      goalId: newGoal.goalId,
      title: newGoal.title,
      color: newGoal.color,
      dDay: Math.ceil(
        (new Date(body.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      ),
      deadlineDate: new Date(body.dueDate)
        .toLocaleDateString('ko-KR', {
          month: '2-digit',
          day: '2-digit',
        })
        .replace('.', '/')
        .slice(0, -1),
      isPinned: newGoal.isPinned,
      createdAt: newGoal.createdAt,
      todos: [],
    };

    // localStorage에 저장
    currentGoals.push(newGoalSummary);
    saveGoalsToStorage(currentGoals);

    return HttpResponse.json(newGoal, { status: 201 });
  }),

  // 목표 수정
  http.put('/goals/:goalId', async ({ params, request }) => {
    const { goalId } = params;
    const body = (await request.json()) as Omit<UpdateGoalRequest, 'goalId'>;

    // localStorage에서 현재 목표 데이터 가져오기
    const currentGoals = getStoredGoals();
    const goalIndex = currentGoals.findIndex(g => g.goalId === goalId);

    if (goalIndex === -1) {
      return HttpResponse.json({ message: '목표를 찾을 수 없습니다.' }, { status: 404 });
    }

    const goal = currentGoals[goalIndex];

    // Dashboard format으로 업데이트
    if (body.title) goal.title = body.title;
    if (body.color) goal.color = body.color;
    if (body.dueDate) {
      goal.dDay = Math.ceil(
        (new Date(body.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      );
      goal.deadlineDate = new Date(body.dueDate)
        .toLocaleDateString('ko-KR', {
          month: '2-digit',
          day: '2-digit',
        })
        .replace('.', '/')
        .slice(0, -1);
    }

    // localStorage에 저장
    saveGoalsToStorage(currentGoals);

    // API response format으로 반환
    return HttpResponse.json({
      goalId: goal.goalId,
      title: goal.title,
      color: goal.color,
      dueDate: body.dueDate || new Date().toISOString(),
      createdAt: goal.createdAt,
      updatedAt: new Date().toISOString(),
      isPinned: goal.isPinned,
      progress: 0,
      todos: [],
    });
  }),
];
