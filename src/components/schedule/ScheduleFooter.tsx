'use client';

import { Button } from '@/components/ui/Button';

interface ScheduleFooterProps {
  onCancel: () => void; // 초기 상태로 되돌리기 (모달 닫지 않음)
  onSave: () => void; // 현재 상태 저장 (모달 닫지 않음)
}

export default function ScheduleFooter({ onCancel, onSave }: ScheduleFooterProps) {
  return (
    <div className="flex justify-end gap-12 px-40 py-20">
      {/* 초기 상태 복원 */}
      <Button
        variant="primary"
        text="schedulecancel"
        size="authModal"
        onClick={onCancel}
        disabled={false}
      >
        취소
      </Button>

      {/* 현재 상태 저장 */}
      <Button
        variant="default"
        text="schedulecheck"
        size="authModal"
        onClick={onSave}
        disabled={false}
      >
        저장
      </Button>
    </div>
  );
}
