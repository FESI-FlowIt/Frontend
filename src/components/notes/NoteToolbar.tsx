import { memo } from 'react';

import ColorPalette from '@/components/notes/ColorPalette';
import { IconButton } from '@/components/ui/IconButton';
import { linkGroup, toolbarGroups } from '@/constants/toolBarGroups';
import { useNoteToolbar } from '@/hooks/useNoteToolbar';

const NoteToolbar = memo(() => {
  const { activeMap, showColorPalette, handleToolbarAction, applyHighlightColor } =
    useNoteToolbar();

  return (
    <div className="border-line rounded-12 relative mx-16 flex h-44 w-auto items-center justify-between border-1 bg-white px-16 py-10 shadow-sm md:mx-0 md:w-full">
      {/* 왼쪽: 메인 툴바 그룹들 */}
      <div className="flex items-center gap-4">
        {toolbarGroups.map((group, i) => (
          <div key={i} className={i > 0 ? 'ml-16 flex gap-4' : 'flex gap-4'}>
            {group.map(([variant, ariaLabel]) => {
              const isActive = activeMap[variant];
              return (
                <div key={variant} className="relative h-24 w-24" data-color-palette>
                  <IconButton
                    variant={variant}
                    aria-label={ariaLabel}
                    onClick={() => handleToolbarAction(variant)}
                    className={`transition-all duration-200 ease-in-out ${
                      isActive
                        ? 'text-primary-01 bg-primary-01/20 border-primary-01/30 scale-105 rounded-full border-2 font-bold shadow-sm'
                        : 'rounded-full hover:scale-105 hover:bg-gray-100'
                    } `}
                  />
                  {/* 색상 팔레트 */}
                  {variant === 'coloring' && showColorPalette && (
                    <ColorPalette onSelectColor={applyHighlightColor} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 오른쪽: 링크 버튼 */}
      <div className="flex items-center">
        {linkGroup.map(([variant, ariaLabel]) => {
          const isActive = activeMap[variant];
          return (
            <IconButton
              key={variant}
              variant={variant}
              aria-label={ariaLabel}
              onClick={() => handleToolbarAction(variant)}
              className={` ${
                isActive
                  ? 'text-primary-01 bg-primary-01/20 border-primary-01/30 scale-105 rounded-full border-2 font-bold shadow-sm'
                  : 'rounded-full'
              } `}
            />
          );
        })}
      </div>
    </div>
  );
});

NoteToolbar.displayName = 'NoteToolbar'; // memo 컴포넌트의 displayName 설정

export default NoteToolbar;
