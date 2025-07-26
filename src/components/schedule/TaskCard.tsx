interface TaskCardProps {
  task: {
    id: string;
    title: string;
    color: string;
  };
  isDraggable?: boolean;
  isAssigned?: boolean;
}

export default function TaskCard({ task, isDraggable = true, isAssigned = false }: TaskCardProps) {
  const containerClass = [
    'flex h-54 items-center justify-between rounded-xl border px-20 transition-colors duration-150',

    isAssigned ? 'w-260 md:w-280' : 'w-328 md:w-280',
    isAssigned ? 'bg-background border-line' : 'bg-white border-line hover:border-primary-01',
    isDraggable ? 'cursor-move' : 'cursor-default',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <div className="flex items-center gap-12">
        <span className="h-12 w-12 rounded-full" style={{ backgroundColor: task.color }} />
        <span className="text-body-m-16 text-text-02">{task.title}</span>
      </div>
    </div>
  );
}
