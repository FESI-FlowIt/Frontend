interface TimerButtonProps {
  goalTitle: string;
  goalColor: string;
  todoContent: string;
}

export default function TaskInfo({ goalTitle, goalColor, todoContent }: TimerButtonProps) {
  return (
    <div className="bg-tertiary-01 rounded-12 mb-80 px-16 pt-20 pb-16">
      <div className="text-body-sb-20 mb-20 flex items-center gap-12">
        <span className={`h-12 w-12 rounded-full bg-goal-${goalColor}`} />
        {goalTitle}
      </div>
      <p className="text-body-long-16 text-text-02">{todoContent}</p>
    </div>
  );
}
