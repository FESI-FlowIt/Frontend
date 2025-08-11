import { useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useDeleteTodo, useToggleTodo } from '@/hooks/useTodos';
import { Todo } from '@/interfaces/todo';
import { ROUTES } from '@/lib/routes';
import { useModalStore } from '@/store/modalStore';
import { useNoteWriteStore } from '@/store/noteWriteStore';

/**
 * TodoItem 컴포넌트의 모든 로직을 관리하는 통합 커스텀 훅
 */
export const useTodoItem = (todo: Todo) => {
  // UI 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFileDropdown, setShowFileDropdown] = useState(false);
  const [showNoteSidebar, setShowNoteSidebar] = useState(false);

  // Refs
  const kebabButtonRef = useRef<HTMLButtonElement>(null);
  const fileDropdownRef = useRef<HTMLDivElement>(null);

  // 외부 훅들
  const toggleTodoMutation = useToggleTodo();
  const deleteTodoMutation = useDeleteTodo();
  const { openTodoEditModal } = useModalStore();
  const goalTitle = useNoteWriteStore(state => state.goalTitle);
  const router = useRouter();

  // === 핸들러 함수들 ===

  // 할 일 토글
  const handleToggle = async () => {
    if (toggleTodoMutation.isPending) return;
    try {
      await toggleTodoMutation.mutateAsync({
        todoId: todo.todoId,
        isDone: !todo.isDone,
      });
    } catch (error) {
      console.error('할일 상태 변경 실패:', error);
    }
  };

  // 아이콘 클릭 핸들러들
  const handleFileClick = () => {
    setShowFileDropdown(!showFileDropdown);
  };

  const handleLinkClick = () => {
    const linkAttachment = todo.attachment?.find(att => att.type === 'link');
    if (linkAttachment?.url) {
      window.open(linkAttachment.url, '_blank');
    }
  };

  const handleNoteClick = () => setShowNoteSidebar(true);

  // 메뉴 액션 핸들러들
  const handleEdit = () => {
    openTodoEditModal(todo);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setIsMenuOpen(false);
  };

  const handleWriteNote = () => {
    const searchParams = new URLSearchParams({
      todoTitle: todo.title,
      goalTitle: goalTitle || '',
    });
    router.push(`${ROUTES.TODOS.Note.WRITE(todo.todoId)}?${searchParams.toString()}`);
    setIsMenuOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTodoMutation.mutateAsync(todo.todoId);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('할일 삭제 실패:', error);
      setShowDeleteConfirm(false);
    }
  };

  // 파일 다운로드 핸들러
  const handleFileDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // 다운로드 후 드롭다운 닫기
      setShowFileDropdown(false);
    } catch (error) {
      console.error('파일 다운로드 중 오류 발생:', error);
      // 오류 발생 시 기본 다운로드 시도
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 다운로드 후 드롭다운 닫기
      setShowFileDropdown(false);
    }
  };

  return {
    // UI 상태
    isMenuOpen,
    setIsMenuOpen,
    showDeleteConfirm,
    setShowDeleteConfirm,
    showFileDropdown,
    setShowFileDropdown,
    showNoteSidebar,
    setShowNoteSidebar,

    // Refs
    kebabButtonRef,
    fileDropdownRef,

    // Mutations
    toggleTodoMutation,
    deleteTodoMutation,

    // Data
    goalTitle,

    // 핸들러들
    handleToggle,
    handleFileClick,
    handleLinkClick,
    handleNoteClick,
    handleEdit,
    handleDelete,
    handleWriteNote,
    handleConfirmDelete,
    handleFileDownload,
  };
};
