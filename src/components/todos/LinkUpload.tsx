'use client';

import React from 'react';

import SelectLinkUploadIcon from '@/../public/assets/icons/selectLinkUploadIcon.svg';
import CloseIcon from '@/assets/icons/close.svg';
import { Attachment } from '@/interfaces/todo';
import { useModalStore } from '@/store/modalStore';

import LinkModal from './LinkModal';

interface LinkUploadProps {
  attachments: Attachment[];
  // eslint-disable-next-line no-unused-vars
  onLinksChange: (links: Attachment[]) => void;
}

const LinkUpload = ({ attachments, onLinksChange }: LinkUploadProps) => {
  const { openLinkModal } = useModalStore();

  const addLink = (newLink: Attachment) => {
    onLinksChange([newLink]);
  };

  const removeLink = () => {
    onLinksChange([]);
  };

  const getDisplayUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + (urlObj.pathname !== '/' ? urlObj.pathname : '');
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-16">
      {attachments.length === 0 ? (
        <button
          type="button"
          onClick={openLinkModal}
          className="border-line text-body-m-16 text-text-03 hover:border-primary-01-hover hover:text-text-02 flex h-160 w-full cursor-pointer items-center justify-center gap-8 rounded-lg border-2 transition-colors"
        >
          <div className="flex items-center justify-center">
            <SelectLinkUploadIcon className="text-snackbar" />
          </div>
          <span>링크 첨부하기</span>
        </button>
      ) : (
        <div className="space-y-8">
          <div className="bg-tertiary-01 flex items-center justify-between rounded-lg p-12">
            <div className="flex items-center gap-20">
              <SelectLinkUploadIcon className="text-snackbar ml-5 h-20 w-20" />
              <div className="flex-1">
                <a
                  href={attachments[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-m-16 text-primary-01 hover:text-primary-01-hover block max-w-300 truncate"
                >
                  {attachments[0].fileName}
                </a>
                <p className="text-body-12 text-text-04 max-w-300 truncate">
                  {getDisplayUrl(attachments[0].url)}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-10">
              <button
                type="button"
                onClick={openLinkModal}
                className="text-primary-01 hover:text-primary-01-hover text-body-m-16 cursor-pointer transition-colors"
              >
                변경
              </button>
              <button
                type="button"
                onClick={removeLink}
                className="text-16 cursor-pointer transition-colors"
              >
                <CloseIcon
                  className="text-delete hover:text-error"
                  width={24}
                  height={24}
                  fill="currentColor"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      <LinkModal onAddLink={addLink} />
    </div>
  );
};

export default LinkUpload;
