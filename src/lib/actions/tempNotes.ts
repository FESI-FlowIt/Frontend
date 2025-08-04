'use server';

import { CreateNoteRequest, NoteFormData } from '@/interfaces/note';
import { redis } from '@/lib/redis';

export const saveTempNote = async (noteData: NoteFormData) => {
  const requestData: CreateNoteRequest = {
    title: noteData.title,
    content: noteData.content, // 원본 content 그대로 저장
    wordCount: noteData.wordCount,
    ...(noteData.link && { link: noteData.link }),
  };

  const dataString = JSON.stringify(requestData);

  console.log('임시저장 데이터:', {
    todoId: noteData.todoId,
    contentSize: new Blob([noteData.content]).size,
    hasLink: !!noteData.link,
  });

  // Redis에 직접 저장 (TTL 10시간)
  await redis.setex(`temp:note:${noteData.todoId}`, 10 * 60 * 60, dataString);
  return { success: true };
};

// 변경 감지로 불필요한 저장 방지
export const saveTempNoteIfChanged = async (noteData: NoteFormData) => {
  const key = `temp:note:${noteData.todoId}`;

  const requestData: CreateNoteRequest = {
    title: noteData.title,
    content: noteData.content,
    wordCount: noteData.wordCount,
    ...(noteData.link && { link: noteData.link }),
  };

  const newDataString = JSON.stringify(requestData);

  // 기존 데이터와 비교
  const existing = await redis.get(key);
  if (existing === newDataString) {
    return { success: true, saved: false, reason: 'no_change' };
  }

  await redis.setex(key, 10 * 60 * 60, newDataString);
  return { success: true, saved: true };
};

export const getTempNoteIfExists = async (todoId: number) => {
  const tempNote = await redis.get(`temp:note:${todoId}`);

  if (!tempNote) {
    return { exists: false, data: null };
  }

  return {
    exists: true,
    data: tempNote as string,
  };
};

export const deleteTempNote = async (todoId: number) => {
  await redis.del(`temp:note:${todoId}`);
  return { success: true };
};

// 가벼운 존재 확인 (GET 대신 EXISTS 사용)
export const hasTempNote = async (todoId: number): Promise<boolean> => {
  const exists = await redis.exists(`temp:note:${todoId}`);
  return exists === 1;
};
