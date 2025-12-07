import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LoginForm from '@/components/auth/LoginForm';
import useLogin from '@/hooks/auth/useLogin';
import { useUser } from '@/hooks/auth/useUser';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

jest.mock('@/components/auth/EmailInput', () => {
  return {
    __esModule: true,
    default: ({ placeholder, register }: any) => {
      const { ref, ...rest } = register('email');
      return <input placeholder={placeholder} ref={ref} {...rest} />;
    },
  };
});

jest.mock('@/components/auth/PasswordInput', () => {
  return {
    __esModule: true,
    default: ({ placeholder, register }: any) => {
      const { ref, ...rest } = register('password');
      return <input placeholder={placeholder} ref={ref} {...rest} />;
    },
  };
});

jest.mock('@/hooks/auth/useLogin');
jest.mock('@/hooks/auth/useUser');
jest.mock('@/store/authStore');
jest.mock('@/store/userStore');

jest.mock('@/components/ui/CustomLoading', () => {
  const Mock = () => <div>Loading...</div>;
  Mock.displayName = 'CustomLoadingMock';
  return Mock;
});

jest.mock('@/components/auth/AuthModal', () => {
  const Mock = ({ isOpen, mode }: any) => (isOpen ? <div>AuthModal - Mode: {mode}</div> : null);
  Mock.displayName = 'AuthModalMock';
  return Mock;
});

describe('LoginForm', () => {
  const setUserMock = jest.fn();
  const loginMutateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUserStore as unknown as jest.Mock).mockReturnValue({
      setUser: setUserMock,
    });

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      accessToken: null,
    });

    (useLogin as jest.Mock).mockReturnValue({
      mutate: loginMutateMock,
      isPending: false,
      isSuccess: false,
      onError: undefined,
    });

    (useUser as jest.Mock).mockReturnValue({
      data: null,
      enabled: false,
    });
  });

  it('이메일, 패스워드 ,버튼 렌더링', () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeDisabled();
  });

  it('이메일 및 패스워드 입력 시 버튼 활성화', () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/이메일/i);
    const passwordInput = screen.getByPlaceholderText(/비밀번호/i);
    const btn = screen.getByRole('button', { name: /로그인/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.blur(passwordInput);

    expect(btn).toBeEnabled();
  });

  it('버튼 클릭 시, login.mutate 함수 호출', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/이메일/i);
    const passwordInput = screen.getByPlaceholderText(/비밀번호/i);
    const btn = screen.getByRole('button', { name: /로그인/i });

    fireEvent.change(emailInput, { target: { value: 'test1@test.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'asd123123' } });
    fireEvent.blur(passwordInput);
    fireEvent.click(btn);

    await waitFor(() => {
      expect(loginMutateMock).toHaveBeenCalledTimes(1);
      expect(loginMutateMock).toHaveBeenCalledWith({
        email: 'test1@test.com',
        password: 'asd123123',
      });
    });
  });

  it('로그인 실패 시 모달 표시', async () => {
    let onErrorFromComponent: any = null;

    (useLogin as jest.Mock).mockImplementation(({ onError }: any) => {
      onErrorFromComponent = onError || null;
      return {
        mutate: loginMutateMock,
        isPending: false,
        isSuccess: false,
        onError,
      };
    });

    render(<LoginForm />);

    if (!onErrorFromComponent) {
      throw new Error('onError 콜백이 전달되지 않았습니다');
    }

    onErrorFromComponent();

    await waitFor(() => {
      expect(screen.getByText(/AuthModal - Mode: login/i)).toBeInTheDocument();
    });
  });

  it('로그인 중일 때 로딩 컴포넌트 렌더링', () => {
    (useLogin as jest.Mock).mockReturnValue({
      mutate: loginMutateMock,
      isPending: true,
      isSuccess: false,
    });

    render(<LoginForm />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
