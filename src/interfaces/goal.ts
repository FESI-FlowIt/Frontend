import { z } from 'zod';

import { Todo } from './todo';

// 목표 데이터와 관련된 인터페이스 정의입니다.
export interface Goal {
  goalId: string;
  title: string; // 최대 30자
  color: string; // hex code 등
  dueDate: string; // ISO date
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  isPinned: boolean;
  progress: number; // 0~100, 완료율
  todos?: Todo[]; // 할 일 목록 (선택)
}

export const goalFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: '목표명을 입력해 주세요.' })
    .max(30, { message: '30자 이내로 입력해 주세요.' }),
  color: z.string().min(1, { message: '색상을 선택해 주세요.' }),
  dueDate: z
    .date({
      required_error: '마감일을 선택해주세요.',
    })
    .refine(date => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: '오늘 이후의 날짜를 선택해 주세요.',
    }),
});

// 목표 생성/수정 시 사용되는 폼 데이터 인터페이스
export type GoalFormData = z.infer<typeof goalFormSchema>;

// 목표 요약 정보 인터페이스
// 목표 목록 조회 시 사용되는 간략한 목표 정보 형식입니다.
export interface GoalSummary {
  goalId: string;
  title: string; // 최대 30자
  color: string; // hex code 등
  dueDate: string; // ISO date
  createdAt: string; // ISO date
  isPinned: boolean;
  progress: number; // 0~100, 완료율
  uncompletedTasksPreview: UncompletedTaskPreview[]; // 미완료 할 일 미리보기 목록
}

// 미완료 할 일 미리보기 정보 인터페이스
export interface UncompletedTaskPreview {
  todoId: string; // 할 일 ID
  goalId: string; // 소속 목표의 ID
  title: string; // 최대 30자
}

//API Request

// 목표 목록 조회 시, 백엔드 api에 전달되는 데이터 형식입니다.
export interface GetGoalsRequestParams {
  page?: number; // 선택 사항: 조회할 페이지 번호 (예: 1, 2, 3...)
  limit?: number; // 선택 사항: 한 페이지에 보여줄 목표의 개수
  sortBy?: 'latest' | 'dueDate'; // 선택 사항: 정렬 기준 ('최신순' 또는 '마감일순')
  isPinned?: boolean; // 선택 사항: 고정된 목표만 필터링할지 여부
}

// 목표 생성 시, 백엔드 api에 전달되는 데이터 형식입니다.
export interface CreateGoalRequest {
  title: string; // 최대 30자
  color: string; // hex code 등
  dueDate: string; // ISO date
}

// 목표 수정 시, 백엔드 api에 전달되는 데이터 형식입니다.
export interface UpdateGoalRequest {
  goalId: string; // 삭제할 목표의 ID
  title?: string; // 최대 30자, 선택적
  color?: string; // hex code 등, 선택적
  dueDate?: string; // ISO date, 선택적
  isPinned?: boolean; // 고정 여부, 선택적
}

export interface UpdateGoalPinStatusRequest {
  goalId: string; // 목표의 ID
  isPinned: boolean; // 고정 상태 (true/false)
}

// 목표 삭제 시, 백엔드 api에 전달되는 데이터 형식입니다.
export interface DeleteGoalRequest {
  goalId: string; // 삭제할 목표의 ID
}
