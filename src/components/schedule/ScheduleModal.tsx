'use client';

import { useEffect, useState } from 'react';
import dayjs from '@/lib/dayjs';

import Modal from '@/components/ui/Modal';
import type { AssignedTask } from '@/interfaces/schedule';
import ScheduleFooter from './ScheduleFooter';
import ScheduleHeader from './ScheduleHeader';
import TimeTable from './TimeTable';
import UnassignedTaskList from './UnassignedTaskList';
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
  assignedTasks: externalAssigned,
  setAssignedTasks: setExternalAssigned,
  selectedDate: initialDate,
  onSaved,
}: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const {
    tasks,
    assignedTasks,
    fetchUnassignedTasks,
    fetchAssignedTasksByDate,
    handleDrop,
    handleDelete,
    handleSave,
  } = useScheduleTasks({
    initialDate,
    externalAssigned,
    setExternalAssigned,
    onSaved,
    onClose,
  });

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialDate);
    }
  }, [isOpen, initialDate]);

  useEffect(() => {
    if (isOpen && selectedDate) {
      fetchUnassignedTasks(selectedDate);
      fetchAssignedTasksByDate(selectedDate);
    }
  }, [isOpen, selectedDate]);

  const handlePrevDate = () => {
    setSelectedDate(prev => dayjs(prev).subtract(1, 'day').format('YYYY-MM-DD'));
  };

  const handleNextDate = () => {
    setSelectedDate(prev => dayjs(prev).add(1, 'day').format('YYYY-MM-DD'));
  };

  const handleCancel = () => {
    onClose();
  };

  const filteredAssignedTasks = assignedTasks.filter(task => task.date === selectedDate);

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="schedule" padding="none" rounded="schedule">
      <div className="flex h-full w-full flex-col">
        <ScheduleHeader onClose={handleCancel} />
        <div className="flex h-full w-full flex-col md:flex-row">
          <UnassignedTaskList tasks={tasks} />
          <TimeTable
            selectedDate={selectedDate}
            onPrevDate={handlePrevDate}
            onNextDate={handleNextDate}
            assignedTasks={filteredAssignedTasks}
            onDropTask={handleDrop}
            onDeleteTask={handleDelete}
          />
        </div>
        <ScheduleFooter onCancel={handleCancel} onSave={handleSave} />
      </div>
    </Modal>
  );
}
