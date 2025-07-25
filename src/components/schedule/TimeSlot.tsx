interface TimeSlotProps {
  time: string;
}

export default function TimeSlot({ time }: TimeSlotProps) {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData('text/plain'));
    console.log(`Dropped task: ${droppedTask.title} at ${time}`);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // drop 허용
  };

  return (
    <div className="flex items-center gap-2" onDrop={handleDrop} onDragOver={handleDragOver}>
      <span className="w-14 text-right text-sm text-gray-400">{time}</span>
      <div className="h-10 flex-1 rounded bg-gray-100 px-2 py-1"></div>
    </div>
  );
}
