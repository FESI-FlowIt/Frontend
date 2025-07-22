import { Button } from '../ui/Button';
import Modal from '../ui/Modal';

type AuthModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  mode: string;
};

export default function AuthModal({ isOpen, closeModal, mode }: AuthModalProps) {
  return (
    <Modal size="auth" padding="auth" rounded="auth" isOpen={isOpen} onClose={closeModal}>
      <div className="flex flex-col items-center py-30">
        <span className="text-body-sb-20 mb-16 text-black">
          {mode === 'login' ? '로그인에 실패했어요 :(' : '회원가입에 실패했어요 :('}
        </span>
        <div className="text-body-m-16 mb-24 flex flex-col items-center text-black">
          {mode === 'login' ? (
            <>
              <span>아이디와 비밀번호를</span>
              <span>다시 한번 확인해주세요</span>
            </>
          ) : (
            <>
              <span>입력 내용 확인 후</span>
              <span>다시 한번 확인해주세요</span>
            </>
          )}
        </div>

        <Button onClick={closeModal} size="authModal" disabled={false}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
