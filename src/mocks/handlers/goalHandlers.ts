import { http, HttpResponse } from 'msw';

import { CreateGoalRequest, UpdateGoalRequest } from '@/interfaces/goal';
import { goalDetailResponses } from '@/mocks/mockResponses/goals/goalDetailResponse';
import { goalSummariesRes } from '@/mocks/mockResponses/goals/goalsResponse';

export const goalHandlers = [
  // 목표 목록 조회 - 실제 API와 맞춤
  http.get('/goals/summaries', async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const size = url.searchParams.get('size'); // limit -> size로 변경
    const sortedBy = url.searchParams.get('sortedBy'); // sortBy -> sortedBy로 변경
    const isPinnedParam = url.searchParams.get('isPinned');

    const hasAdvancedParams = page || size || sortedBy || isPinnedParam;

    const pageNum = parseInt(page || '0'); //(0-based)
    const sizeNum = parseInt(size || '6');
    const sortedByValue = (sortedBy as 'LATEST' | 'DUE_DATE') || 'LATEST';
    const isPinned =
      isPinnedParam === 'true' ? true : isPinnedParam === 'false' ? false : undefined;

    const isSuccess = true;

    if (isSuccess) {
      // Query parameter가 없으면 원래 방식으로 단순 반환
      if (!hasAdvancedParams) {
        const filteredGoals = goalSummariesRes.goals;
        const simpleResponse = {
          code: 'SUCCESS',
          message: '목표 목록 조회 성공',
          result: {
            contents: filteredGoals.map(goal => ({
              goalId: goal.goalId,
              goalName: goal.title,
              color: goal.color,
              createDateTime: goal.createdAt,
              dueDateTime: new Date(Date.now() + goal.dDay * 24 * 60 * 60 * 1000).toISOString(),
              isPinned: goal.isPinned,
              todos:
                goal.todos?.map(todo => ({
                  todoId: todo.id,
                  todoName: todo.title,
                  isDone: todo.isDone,
                  attachment: todo.attachment || [],
                  notes: todo.notes || [],
                })) || [],
              progressRate: goal.todos
                ? Math.round((goal.todos.filter(t => t.isDone).length / goal.todos.length) * 100)
                : 0,
            })),
            page: 1, // 1-based 첫 페이지
            size: filteredGoals.length,
            totalPage: 1,
            totalElement: filteredGoals.length,
            isFirst: true,
            isLast: true,
            hasNext: false,
            hasPrev: false,
          },
        };
        return HttpResponse.json(simpleResponse);
      }

      // 목 데이터에서 목표 데이터 가져오기 (복사본 생성)
      let goals = [...goalSummariesRes.goals];

      // 필터링 (고정된 목표만 보기)
      if (isPinned !== undefined) {
        goals = goals.filter(goal => goal.isPinned === isPinned);
      }

      // 정렬
      if (sortedByValue === 'LATEST') {
        goals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (sortedByValue === 'DUE_DATE') {
        goals.sort((a, b) => a.dDay - b.dDay);
      }

      // 페이지네이션
      const totalCount = goals.length;
      const totalPages = Math.ceil(totalCount / sizeNum);
      const startIndex = pageNum * sizeNum; // 0-based이므로 pageNum 그대로 사용
      const endIndex = startIndex + sizeNum;
      const paginatedGoals = goals.slice(startIndex, endIndex);

      const response = {
        code: 'SUCCESS',
        message: '목표 목록 조회 성공',
        result: {
          contents: paginatedGoals.map(goal => ({
            goalId: goal.goalId,
            goalName: goal.title,
            color: goal.color,
            createDateTime: goal.createdAt,
            dueDateTime: new Date(Date.now() + goal.dDay * 24 * 60 * 60 * 1000).toISOString(),
            isPinned: goal.isPinned,
            todos:
              goal.todos?.map(todo => ({
                todoId: todo.id,
                todoName: todo.title,
                isDone: todo.isDone,
                attachment: todo.attachment || [],
                notes: todo.notes || [],
              })) || [],
            progressRate: goal.todos
              ? Math.round((goal.todos.filter(t => t.isDone).length / goal.todos.length) * 100)
              : 0,
          })),
          page: pageNum + 1, // 0-based를 1-based로 변환
          size: sizeNum,
          totalPage: totalPages,
          totalElement: totalCount,
          isFirst: pageNum === 0, // 0-based이므로 첫 페이지는 0
          isLast: pageNum === totalPages - 1, // 마지막 페이지는 totalPages - 1
          hasNext: pageNum < totalPages - 1,
          hasPrev: pageNum > 0,
        },
      };

      return HttpResponse.json(response);
    }

    return HttpResponse.json({ message: '목표 데이터를 불러오지 못했습니다.' }, { status: 500 });
  }),

  // 기존 /goals 엔드포인트도 유지 (하위 호환성)
  http.get('/goals', async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const limit = url.searchParams.get('limit');
    const sortBy = url.searchParams.get('sortBy');
    const isPinnedParam = url.searchParams.get('isPinned');

    // Query parameter가 하나라도 있으면 처리, 없으면 단순 반환
    const hasAdvancedParams = page || limit || sortBy || isPinnedParam;

    const pageNum = parseInt(page || '1');
    const limitNum = parseInt(limit || '6');
    const sortByValue = (sortBy as 'latest' | 'deadlineDate') || 'latest';
    const isPinned =
      isPinnedParam === 'true' ? true : isPinnedParam === 'false' ? false : undefined;

    const isSuccess = true;

    if (isSuccess) {
      // Query parameter가 없으면 원래 방식으로 단순 반환
      if (!hasAdvancedParams) {
        const filteredGoals = goalSummariesRes.goals;
        return HttpResponse.json({
          ...goalSummariesRes,
          goals: filteredGoals,
        });
      }

      // 목 데이터에서 목표 데이터 가져오기 (복사본 생성)
      let goals = [...goalSummariesRes.goals];

      // 필터링 (고정된 목표만 보기)
      if (isPinned !== undefined) {
        goals = goals.filter(goal => goal.isPinned === isPinned);
      }

      // 정렬
      if (sortByValue === 'latest') {
        goals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (sortByValue === 'deadlineDate') {
        goals.sort((a, b) => a.dDay - b.dDay);
      }

      // 페이지네이션
      const totalCount = goals.length;
      const totalPages = Math.ceil(totalCount / limitNum);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;
      const paginatedGoals = goals.slice(startIndex, endIndex);

      const response = {
        goals: paginatedGoals,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1,
        },
      };

      return HttpResponse.json(response);
    }

    return HttpResponse.json({ message: '목표 데이터를 불러오지 못했습니다.' }, { status: 500 });
  }),

  // 목표 상세 조회 (GET /goals/:goalId/summary)
  http.get('/goals/:goalId/summary', async ({ params }) => {
    const goalId = Number(params.goalId);

    const goalDetail = goalDetailResponses[goalId];
    if (!goalDetail) {
      return HttpResponse.json({ message: '목표를 찾을 수 없습니다.' }, { status: 404 });
    }

    return HttpResponse.json({ result: goalDetail });
  }),

  // 목표 수정 (PATCH /goals/:goalId)
  http.patch('/goals/:goalId', async ({ params, request }) => {
    const goalId = Number(params.goalId);
    const body = (await request.json()) as Partial<UpdateGoalRequest> | null;

    const goal = goalSummariesRes.goals.find(g => g.goalId === goalId);
    if (!goal) {
      return HttpResponse.json({ message: '목표를 찾을 수 없습니다.' }, { status: 404 });
    }

    if (body && body.title) goal.title = body.title;
    if (body && body.color) goal.color = body.color;
    if (body && body.deadlineDate) {
      goal.dDay = Math.ceil(
        (new Date(body.deadlineDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      );
      goal.deadlineDate = body.deadlineDate;
    }
    return HttpResponse.json({ result: goal });
  }),

  // 목표 고정 상태 변경 (PATCH /goals/:goalId/pin)
  http.patch('/goals/:goalId/pin', async ({ params, request }) => {
    const goalId = Number(params.goalId);
    const body = (await request.json()) as { isPinned?: boolean } | null;
    const goal = goalSummariesRes.goals.find(g => g.goalId === goalId);
    if (!goal) {
      return HttpResponse.json({ message: '목표를 찾을 수 없습니다.' }, { status: 404 });
    }
    if (body && typeof body.isPinned === 'boolean') {
      goal.isPinned = body.isPinned;
    }
    return HttpResponse.json({ result: goal });
  }),

  // 목표 생성
  http.post('/goals', async ({ request }) => {
    const body = (await request.json()) as CreateGoalRequest | null;
    if (!body) {
      return HttpResponse.json({ message: '잘못된 요청입니다.' }, { status: 400 });
    }
    const newGoal = {
      goalId: Date.now(),
      title: body.name,
      color: body.color,
      deadlineDate: body.dueDateTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      progress: 0,
      todos: [],
    };
    return HttpResponse.json({ result: newGoal }, { status: 201 });
  }),

  // 목표 수정
  http.put('/goals/:goalId', async ({ params, request }) => {
    const goalId = Number(params.goalId);
    const body = (await request.json()) as Partial<UpdateGoalRequest> | null;
    const goal = goalSummariesRes.goals.find(g => g.goalId === goalId);
    if (!goal) {
      return HttpResponse.json({ message: '목표를 찾을 수 없습니다.' }, { status: 404 });
    }
    if (body && body.title) goal.title = body.title;
    if (body && body.color) goal.color = body.color;
    if (body && body.deadlineDate) {
      goal.dDay = Math.ceil(
        (new Date(body.deadlineDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      );
      goal.deadlineDate = body.deadlineDate;
    }
    return HttpResponse.json({
      goalId: goal.goalId,
      title: goal.title,
      color: goal.color,
      deadlineDate: goal.deadlineDate,
      createdAt: goal.createdAt,
      updatedAt: new Date().toISOString(),
      isPinned: goal.isPinned,
      todos: goal.todos || [],
    });
  }),

  // 목표 삭제
  http.delete('/goals/:goalId', async ({ params }) => {
    const goalId = Number(params.goalId);
    const goalIndex = goalSummariesRes.goals.findIndex(g => g.goalId === goalId);
    if (goalIndex === -1) {
      return HttpResponse.json({ message: '목표를 찾을 수 없습니다.' }, { status: 404 });
    }
    goalSummariesRes.goals.splice(goalIndex, 1);
    return HttpResponse.json({ message: '목표가 삭제되었습니다.' });
  }),
];
