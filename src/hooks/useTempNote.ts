'use client';

import { useCallback, useEffect, useState } from 'react';

import { NoteFormData } from '@/interfaces/note';
import { getTempNoteIfExists, saveTempNoteIfChanged } from '@/lib/actions/tempNotes';
import { useNoteWriteStore } from '@/store/noteWriteStore';

import { useToast } from './useToast';
interface TempNoteData {
  title: string;
  content: string;
  wordCount: number;
  link?: string;
}

export const useTempNote = (todoId: number | null) => {
  const [cachedData, setCachedData] = useState<TempNoteData | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSavedContent, setLastSavedContent] = useState<string>('');
  const [hasLoadedToForm, setHasLoadedToForm] = useState(false); // 폼에 로드했는지 추적

  const { setTitle, setContent, setWordCount, setLink } = useNoteWriteStore();
  const toast = useToast();

  // todoId가 변경되면 캐시 초기화
  useEffect(() => {
    setCachedData(undefined);
    setLastSavedContent('');
    setHasLoadedToForm(false);
  }, [todoId]);

  // 임시 노트 존재 여부만 확인 (폼에 자동 로드하지 않음)
  const checkTempNote = useCallback(async () => {
    if (todoId === null) return;

    // 이미 확인했으면 캐시 사용
    if (cachedData !== undefined) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await getTempNoteIfExists(todoId);
      let data: TempNoteData | null = null;

      if (result.exists && result.data) {
        try {
          // result.data가 이미 객체인지 문자열인지 확인
          const resultData: unknown = result.data;
          if (typeof resultData === 'string') {
            data = JSON.parse(resultData);
          } else if (typeof resultData === 'object' && resultData !== null) {
            data = resultData as TempNoteData;
          }
        } catch (parseError) {
          console.error('임시저장 데이터 파싱 실패:', parseError);
          console.error('원본 데이터:', result.data);
          data = null;
        }
      }

      setCachedData(data); // 캐시에만 저장, 폼에는 로드하지 않음
    } finally {
      setIsLoading(false);
    }
  }, [todoId, cachedData]);

  // 수동으로 임시저장 내용을 폼에 불러오기
  const loadTempToForm = useCallback(async () => {
    if (todoId === null || !cachedData) return;

    try {
      setTitle(cachedData.title);
      setContent(cachedData.content);
      setWordCount(cachedData.wordCount);
      if (cachedData.link) {
        setLink(cachedData.link);
      }
      setHasLoadedToForm(true);
      toast.info('임시저장된 노트가 불러와졌어요');
    } catch (error) {
      console.error('임시저장 불러오기 실패:', error);
    }
  }, [todoId, cachedData, setTitle, setContent, setWordCount, setLink, toast]);

  // 임시 노트 저장
  const saveTemp = useCallback(
    async (data: NoteFormData) => {
      if (todoId === null) return;

      const contentString = JSON.stringify({
        title: data.title,
        content: data.content,
        wordCount: data.wordCount,
        link: data.link,
      });

      if (lastSavedContent === contentString) {
        return;
      }

      try {
        const result = await saveTempNoteIfChanged(data);

        if (result.saved) {
          const tempData = {
            title: data.title,
            content: data.content,
            wordCount: data.wordCount,
            link: data.link,
          };
          setCachedData(tempData);
          setLastSavedContent(contentString);
          setHasLoadedToForm(true); // 임시저장 후 알림 숨기기
          toast.info('변경사항이 임시저장 되었어요');
        }
      } catch (error) {
        console.error('임시저장 실패:', error);
      }
    },
    [todoId, lastSavedContent, toast],
  );

  // todoId 변경 시 임시저장 존재 여부만 확인
  useEffect(() => {
    if (todoId !== null) {
      checkTempNote();
    }
  }, [todoId, checkTempNote]);

  return {
    isLoading,
    hasTemp: cachedData !== null && cachedData !== undefined && !hasLoadedToForm,
    loadTempToForm,
    saveTemp,
    tempData: cachedData || null,
  };
};
