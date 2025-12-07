import { render, screen } from '@testing-library/react';

import NameInput from '@/components/auth/NameInput';

describe('NameInput', () => {
  const setup = (propsOverride = {}) => {
    const defaultProps = {
      label: '이름',
      register: jest.fn(() => ({ name: '이름', onChange: jest.fn(), ref: jest.fn() })),
      error: undefined,
    };

    const utils = render(<NameInput {...defaultProps} {...propsOverride} />);

    return {
      ...utils,
      props: { ...defaultProps, ...propsOverride },
    };
  };

  it('label 렌더링', () => {
    setup();
    expect(screen.getByText('이름')).toBeInTheDocument();
  });

  it('error 메세지 출력', () => {
    const errorMsg = '이름은 필수입니다';
    setup({ error: errorMsg });

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});
