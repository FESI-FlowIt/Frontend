import { fireEvent, render, screen } from '@testing-library/react';

import EmailInput from '@/components/auth/EmailInput';

describe('EmailInput', () => {
  const setup = (propsOverride = {}) => {
    const defaultProps = {
      label: '이메일',
      register: jest.fn(() => ({ name: 'email', onchange: jest.fn(), ref: jest.fn() })),
      email: '',
      serverError: null,
      isChecked: false,
      onCheck: jest.fn(),
      showCheckButton: false,
      placeholder: '이메일을 입력해주세요',
    };
    const utils = render(<EmailInput {...defaultProps} {...propsOverride} />);

    return {
      ...utils,
      props: { ...defaultProps, ...propsOverride },
    };
  };

  it('label 렌더링', () => {
    setup();
    expect(screen.getByText('이메일')).toBeInTheDocument();
  });

  it('placeholder 렌더링', () => {
    setup();
    expect(screen.getByPlaceholderText('이메일을 입력해주세요')).toBeInTheDocument();
  });

  it('serverError 메세지 렌더링', () => {
    setup({ serverError: '이미 존재하는 이메일입니다.' });
    expect(screen.getByText('이미 존재하는 이메일입니다.')).toBeInTheDocument();
  });

  it('이메일 검증이 성공했을때 성공 메세지 렌더링', () => {
    setup({ isChecked: true });
    expect(screen.getByText('인증이 완료되었습니다!')).toBeInTheDocument();
  });

  it('check btn 렌더링', () => {
    setup({ showCheckButton: true, email: 'test@example.com' });
    expect(screen.getByRole('button', { name: '확인' })).toBeInTheDocument();
  });

  it('invalid한 이메일일 때 check button disabled', () => {
    setup({ showCheckButton: true, email: 'invalid-email' });
    expect(screen.getByRole('button', { name: '확인' })).toBeDisabled();
  });

  it('이미 이메일 체크되었을 때 check button disabled', () => {
    setup({ showCheckButton: true, email: 'test@example.com', isChecked: true });
    expect(screen.getByRole('button', { name: '확인' })).toBeDisabled();
  });

  it('이메일 검증 시 onCheck 핸들러 호출', () => {
    const onCheckMock = jest.fn();
    setup({ showCheckButton: true, email: 'test@exampe.com', onCheck: onCheckMock });

    const button = screen.getByRole('button', { name: '확인' });
    fireEvent.click(button);

    expect(onCheckMock).toHaveBeenCalledTimes(1);
  });
});
