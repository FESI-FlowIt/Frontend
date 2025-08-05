import React from 'react';

import DeleteIcon from '@/assets/icons/ic-delete.svg';
import EmbedIcon from '@/assets/icons/ic-embed.svg';
interface LinkCardProps {
  url: string;
  onRemove?: () => void;
  className?: string;
}

const LinkCard = ({ url, onRemove }: LinkCardProps) => {
  // 링크 클릭 핸들러
  const handleLinkClick = () => {
    const finalUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  // 삭제 버튼 클릭 핸들러
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div>
      <div className="rounded-20 bg-background h-32 w-full px-6 py-4">
        {/* 링크 카드 메인 영역 */}
        <div onClick={handleLinkClick} className="flex h-24 cursor-pointer items-center">
          {/* 링크 아이콘 */}
          <EmbedIcon width={24} height={24} className="embed-icon" />

          {/* 링크 정보 */}
          <div className="min-w-0 flex-1">
            <div className="text-text-02 text-body-m-16 ml-8 truncate">{url}</div>
          </div>

          {/* 삭제 버튼 */}
          <div className="ml-8 flex-shrink-0">
            <button
              onClick={handleRemoveClick}
              className="rounded-4 p-4 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label="링크 삭제"
            >
              <DeleteIcon width={24} height={24} className="delete-button-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
