'use client';

import React, { useState } from 'react';

import SelectFileUploadIcon from '@/../public/assets/icons/selectFileUploadIcon.svg';
import SelectLinkUploadIcon from '@/../public/assets/icons/selectLinkUploadIcon.svg';
import { Attachment } from '@/interfaces/todo';
import { useAttachmentStore } from '@/store/attachmentStore';

import FileUpload from './FileUpload';
import LinkUpload from './LinkUpload';
import TodoModalButton from './TodoModalButton';

const AttachmentUpload = () => {
  const [activeTab, setActiveTab] = useState<'file' | 'link' | null>('file');

  const { processFiles, processLinks, getFileAttachments, getLinkAttachments } =
    useAttachmentStore();

  const fileAttachments = getFileAttachments();
  const linkAttachments = getLinkAttachments();

  const handleFileUploadClick = () => {
    if (activeTab !== 'file') {
      setActiveTab('file');
    }
  };

  const handleLinkUploadClick = () => {
    if (activeTab !== 'link') {
      setActiveTab('link');
    }
  };

  const handleLinksChange = (links: Attachment[]) => {
    processLinks(links);
  };

  return (
    <div className="space-y-16">
      <div className="flex gap-20">
        <TodoModalButton
          type={'file'}
          activeTab={activeTab}
          onClick={handleFileUploadClick}
          icon={<SelectFileUploadIcon />}
        >
          파일 업로드
        </TodoModalButton>
        <TodoModalButton
          type={'link'}
          activeTab={activeTab}
          onClick={handleLinkUploadClick}
          icon={<SelectLinkUploadIcon />}
        >
          링크 첨부
        </TodoModalButton>
      </div>

      {activeTab && (
        <div className="">
          {activeTab === 'file' && (
            <FileUpload attachments={fileAttachments} onFilesChange={processFiles} />
          )}

          {activeTab === 'link' && (
            <LinkUpload attachments={linkAttachments} onLinksChange={handleLinksChange} />
          )}
        </div>
      )}
    </div>
  );
};

export default AttachmentUpload;
