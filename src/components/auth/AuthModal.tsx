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
      <div className="flex flex-col items-center">
        <span className="text-body-sb-20 text-black">
          {mode === 'login' ? '로그인에 실패했어요 :(' : '회원가입에 실패했어요 :('}
        </span>
        {mode === 'login' ? (
          <span className="text-body-m-16 mb-16 mb-24 text-black">
            아이디와 비밀번호를
            <br />
            다시 한번 확인해주세요
          </span>
        ) : (
          <span className="text-body-m-16 mb-24 text-black">
            입력 내용 확인 후<br />
            다시 한번 확인해주세요
          </span>
        )}
        <Button size="authModal" disabled={false}>
          확인
        </Button>
      </div>
    </Modal>
  );
}
