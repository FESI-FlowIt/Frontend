import React from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import { ToastContainer } from '@/components/ui/Toast/ToastContainer';
import { useToast } from '@/hooks/useToast';

const meta: Meta = {
  title: 'Components/UI/Toast',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

// Success 토스트 컴포넌트
const SuccessToastDemo = () => {
  const toast = useToast();

  const showSuccessToast = () => {
    toast.success('게시글이 생성되었어요');
  };

  return (
    <div className="p-24">
      <h1 className="text-display-24 text-text-01 mb-24">Success Toast</h1>

      <button
        onClick={showSuccessToast}
        className="rounded-8 bg-success px-24 py-16 text-white hover:opacity-80"
      >
        Success 토스트 보기
      </button>

      <ToastContainer />
    </div>
  );
};

// Error 토스트 컴포넌트
const ErrorToastDemo = () => {
  const toast = useToast();

  const showErrorToast = () => {
    toast.error('게시글 생성에 실패했어요');
  };

  return (
    <div className="p-24">
      <h1 className="text-display-24 text-text-01 mb-24">Error Toast</h1>

      <button
        onClick={showErrorToast}
        className="rounded-8 bg-error px-24 py-16 text-white hover:opacity-80"
      >
        Error 토스트 보기
      </button>

      <ToastContainer />
    </div>
  );
};

// Warning 토스트 컴포넌트
const WarningToastDemo = () => {
  const toast = useToast();

  const showWarningToast = () => {
    toast.warning('일부 이미지 업로드에 실패했어요');
  };

  return (
    <div className="p-24">
      <h1 className="text-display-24 text-text-01 mb-24">Warning Toast</h1>

      <button
        onClick={showWarningToast}
        className="rounded-8 bg-warning px-24 py-16 text-white hover:opacity-80"
      >
        Warning 토스트 보기
      </button>

      <ToastContainer />
    </div>
  );
};

// Info 토스트 컴포넌트
const InfoToastDemo = () => {
  const toast = useToast();

  const showInfoToast = () => {
    toast.info('변경사항이 임시저장 되었어요');
  };

  return (
    <div className="p-24">
      <h1 className="text-display-24 text-text-01 mb-24">Info Toast</h1>

      <button
        onClick={showInfoToast}
        className="rounded-8 bg-primary-01 px-24 py-16 text-white hover:opacity-80"
      >
        Info 토스트 보기
      </button>

      <ToastContainer />
    </div>
  );
};

type Story = StoryObj;

export const Success: Story = {
  render: () => <SuccessToastDemo />,
};

export const Error: Story = {
  render: () => <ErrorToastDemo />,
};

export const Warning: Story = {
  render: () => <WarningToastDemo />,
};

export const Info: Story = {
  render: () => <InfoToastDemo />,
};
