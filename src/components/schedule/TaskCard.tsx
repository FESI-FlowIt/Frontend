import { IconButton } from '@/components/ui/IconButton';

interface TaskCardProps {
  task: { id: string; title: string; color: string };
  showDelete?: boolean;
  onDelete?: (id: string) => void;
  showHover?: boolean;
  isDraggable?: boolean;
  isAssigned?: boolean;
}

export default function TaskCard({
  task,
  showDelete = false,
  onDelete,
  showHover = true,
  isDraggable = true,
  isAssigned = false,
}: TaskCardProps) {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(task.id);
  };

  return (
    <div
      className={`flex h-54 w-280 items-center justify-between rounded-xl border px-20 transition-colors duration-150 ${isAssigned ? 'bg-background border-line' : 'border-line hover:border-primary-01 bg-white'} ${isDraggable ? 'cursor-move' : 'cursor-default'} `}
    >
      <div className="flex items-center gap-12">
        <span className="h-12 w-12 rounded-full" style={{ backgroundColor: task.color }} />
        <span className="text-sm text-gray-800">{task.title}</span>
      </div>
    </div>
  );
}
