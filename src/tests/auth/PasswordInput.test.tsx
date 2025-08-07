import { fireEvent, render, screen } from '@testing-library/react';

import PasswordInput from '@/components/auth/PasswordInput';

describe('PasswordInput', () => {
  const setup = (propsOverride = {}) => {
    const defaultProps = {
      label: '비밀번호',
      placeholder: '비밀번호를 입력해주세요',
      register: jest.fn(() => ({ name: 'password', onChange: jest.fn, ref: jest.fn() })),
      name: 'password',
      error: null,
    };

    const utils = render(<PasswordInput {...defaultProps} {...propsOverride} />);

    return {
      ...utils,
      props: { ...defaultProps, ...propsOverride },
    };
  };

  it('label 렌더링', () => {
    setup();
    expect(screen.getByText('비밀번호')).toBeInTheDocument();
  });

  it('placeholder 렌더링', () => {
    setup();
    expect(screen.getByPlaceholderText('비밀번호를 입력해주세요')).toBeInTheDocument();
  });

  it('PasswordInput의 기본 인풋 타입은 password', () => {
    setup();

    const input = screen.getByPlaceholderText('비밀번호를 입력해주세요');

    expect(input).toHaveAttribute('type', 'password');
  });

  it('비밀번호 보기 버튼 누르면 인풋 타입 text로 변환', () => {
    setup();
    const button = screen.getByRole('button', { name: '비밀번호 보기' });

    fireEvent.click(button);

    const input = screen.getByPlaceholderText('비밀번호를 입력해주세요');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('비밀번호 숨기기 버튼 누르면 인풋 타입 password로 변환', () => {
    setup();

    const showBtn = screen.getByRole('button', { name: '비밀번호 보기' });
    fireEvent.click(showBtn);

    expect(screen.getByPlaceholderText('비밀번호를 입력해주세요')).toHaveAttribute('type', 'text');

    const hideBtn = screen.getByRole('button', { name: '비밀번호 숨기기' });
    fireEvent.click(hideBtn);

    expect(screen.getByPlaceholderText('비밀번호를 입력해주세요')).toHaveAttribute(
      'type',
      'password',
    );
  });
});
