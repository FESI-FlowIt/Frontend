import { fireEvent, render, screen } from '@testing-library/react';

import { Input } from '@/components/ui/Input';

describe('Input 컴포넌트', () => {
  it('placeholder 적용', () => {
    render(<Input placeholder="입력하세요." />);
    const input = screen.getByPlaceholderText('입력하세요.');
    expect(input).toBeInTheDocument();
  });

  it('defaultValue 사용해 비제어 컴포넌트로 적용', () => {
    render(<Input defaultValue="기본값" />);
    const input = screen.getByDisplayValue('기본값');
    expect(input).toBeInTheDocument();
  });

  it('value 사용해 제어 컴포넌트로 적용', () => {
    render(<Input value="제어됨" onChange={() => {}} />);
    const input = screen.getByDisplayValue('제어됨');
    expect(input).toBeInTheDocument();
  });

  it('onChange 콜백 호출', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '변경' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('hasError일 때 에러 클래스 적용', () => {
    render(<Input hasError />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass('border-error');
  });

  it('props에 따른 클래스 적용', () => {
    render(<Input variant="modal" inputSize="withBtn" text="noteTitle" placeholder="테스트" />);
    const input = screen.getByPlaceholderText('테스트');

    expect(input).toHaveClass('rounded-lg');
    expect(input).toHaveClass('h-60');
    expect(input).toHaveClass('text-body-m-20');
  });
});
