import { IconButton } from '@/components/ui/IconButton';
import { linkGroup, toolbarGroups } from '@/constants/toolBarGroups';

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
