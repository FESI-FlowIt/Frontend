'use client';

import Modal from '@/components/ui/Modal';
import ScheduleFooter from './ScheduleFooter';
import ScheduleHeader from './ScheduleHeader';
import TimeTable from './TimeTable';
import UnassignedTaskList from './UnassignedTaskList';
import type { AssignedTask } from '@/interfaces/schedule';
import { useScheduleTasks } from '@/hooks/useSchedule';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignedTasks: AssignedTask[];
  setAssignedTasks: React.Dispatch<React.SetStateAction<AssignedTask[]>>;
  selectedDate: string;
  onSaved: (updated: AssignedTask[], changedDates: string[]) => void;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  assignedTasks,
  setAssignedTasks,
  selectedDate,
  onSaved,
}: ScheduleModalProps) {
  const {
    assignedTasks: currentAssigned,
    tasks,
    selectedDate: date,
    handlePrevDate,
    handleNextDate,
    handleDrop,
    handleDelete,
    handleCancel,
    handleSave,
  } = useScheduleTasks({
    isOpen,
    initialDate: selectedDate,
    externalAssigned: assignedTasks,
    setExternalAssigned: setAssignedTasks,
    onClose,
    onSaved,
  });

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="schedule" padding="none" rounded="schedule">
      <div className="flex h-full w-full flex-col">
        <ScheduleHeader onClose={handleCancel} />
        <div className="flex h-full w-full flex-col md:flex-row">
          <UnassignedTaskList tasks={tasks} />
          <TimeTable
            selectedDate={date}
            onPrevDate={handlePrevDate}
            onNextDate={handleNextDate}
            assignedTasks={currentAssigned}
            onDropTask={handleDrop}
            onDeleteTask={handleDelete}
          />
        </div>
        <ScheduleFooter onCancel={handleCancel} onSave={handleSave} />
      </div>
    </Modal>
  );
}
