import { IconButton } from '@/components/ui/IconButton';

const toolbarGroups = [
  [
    ['bold', '굵게'],
    ['italic', '기울임꼴'],
    ['underline', '밑줄'],
  ],
  [
    ['alignmentleft', '왼쪽 정렬'],
    ['alignmentcenter', '가운데 정렬'],
    ['alignmentright', '오른쪽 정렬'],
  ],
  [
    ['bullet', '글머리 기호'],
    ['numbering', '번호 매기기'],
    ['coloring', '색상'],
  ],
] as const;

const linkGroup = [['link', '링크첨부']] as const;

const NoteToolbar = () => (
  <div className="border-line rounded-12 flex h-44 w-full items-center justify-between border-1 bg-white px-16 py-10 shadow-sm">
    <div className="flex items-center gap-4">
      {toolbarGroups.map((group, i) => (
        <div key={i} className={i > 0 ? 'ml-16 flex gap-4' : 'flex gap-4'}>
          {group.map(([variant, ariaLabel]) => (
            <IconButton key={variant} variant={variant} aria-label={ariaLabel} />
          ))}
        </div>
      ))}
    </div>
    <div className="bg-tertiary-01 flex h-24 w-24 items-center justify-center gap-4 rounded-full p-4">
      {linkGroup.map(([variant, ariaLabel]) => (
        <IconButton key={variant} variant={variant} aria-label={ariaLabel} />
      ))}
    </div>
  </div>
);

export default NoteToolbar;
