'use client';

import React, { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import CloseIcon from '@/assets/icons/close.svg';
import { useToast } from '@/hooks/useToast';
import { Attachment } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

import { Button } from '../ui/Button';
import FormField from '../ui/FormField';
import { Input } from '../ui/Input';
import Modal from '../ui/Modal';

interface LinkModalProps {
  // eslint-disable-next-line no-unused-vars
  onAddLink?: (link: Attachment) => void;
  // eslint-disable-next-line no-unused-vars
  onAddNoteLink?: (url: string) => void;
}

const linkFormSchema = z.object({
  url: z
    .string()
    .min(1, { message: 'URL을 입력해주세요.' })
    .refine(
      url => {
        const urlPattern = /^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/;
        return urlPattern.test(url);
      },
      {
        message: '올바른 URL 형식을 입력해주세요. (예: www.naver.com, https://google.com)',
      },
    ),
});

type LinkFormData = z.infer<typeof linkFormSchema>;

const LinkModal = ({ onAddLink, onAddNoteLink }: LinkModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { linkModalIsOpen, closeLinkModal } = useModalStore();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkFormSchema),
    mode: 'onChange',
  });

  const normalizeUrl = (url: string): string => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return `https://${url}`;
  };

  const getDisplayTitle = (url: string) => {
    try {
      const normalizedUrl = normalizeUrl(url);
      const urlObj = new URL(normalizedUrl);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleFormSubmit = async (data: LinkFormData) => {
    setIsSubmitting(true);

    try {
      const normalizedUrl = normalizeUrl(data.url);

      if (onAddNoteLink) {
        // Note용 링크 추가
        onAddNoteLink(normalizedUrl);
      } else if (onAddLink) {
        // Todo용 링크 추가
        const newLink: Attachment = {
          type: 'link',
          url: normalizedUrl,
          fileName: getDisplayTitle(data.url),
        };
        onAddLink(newLink);
      }

      reset();
      closeLinkModal();
    } catch (error) {
      toast.error('링크 추가에 실패했어요. 다시 시도해주세요.');
      console.error('링크 추가 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmitWithStopPropagation = (e: React.FormEvent) => {
    e.stopPropagation();
    handleSubmit(handleFormSubmit)(e);
  };

  const handleClose = () => {
    reset();
    closeLinkModal();
  };

  return (
    <Modal
      isOpen={linkModalIsOpen}
      onClose={handleClose}
      size="link"
      padding="default"
      margin="default"
      rounded="default"
      layer="stacked"
    >
      <div className="mb-32 flex items-center justify-between">
        <h2 className="text-display-24 text-text-01 flex items-center font-bold">링크 업로드</h2>
        <button
          type="button"
          onClick={handleClose}
          className="text-text-04 hover:text-text-03 h-12 w-12 cursor-pointer transition-colors"
        >
          <CloseIcon className="text-text-02" width={12} height={12} fill="currentColor" />
        </button>
      </div>

      <form onSubmit={handleFormSubmitWithStopPropagation} noValidate>
        <div className="space-y-24">
          <FormField label="링크 URL" htmlFor="url">
            <Input
              id="url"
              type="url"
              variant="modal"
              {...register('url')}
              placeholder="www.example.com 또는 https://example.com"
              hasError={!!errors.url}
              inputSize="modal"
            />
            {errors.url && <p className="text-error text-body-12 mt-4">{errors.url.message}</p>}
          </FormField>
        </div>

        <div className="mt-40 flex gap-12">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            variant="default"
            text="default"
            size="md"
            rounded="lg"
            className="flex-1"
          >
            {isSubmitting ? '추가 중...' : '확인'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LinkModal;
