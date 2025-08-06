import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '@/components/ui/Button';

describe('Button 컴포넌트', () => {
  it('기본 렌더링', () => {
    render(<Button>클릭</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('클릭');
  });

  it('props에 따른 클래스가 적용.', () => {
    const { container } = render(
      <Button variant="secondary" size="modal" text="primary" rounded="lg" disabled={false}>
        버튼
      </Button>,
    );

    const btn = container.querySelector('button');
    expect(btn).toBeInTheDocument();

    expect(btn).toHaveClass('bg-secondary-01');
    expect(btn).toHaveClass('h-48', 'w-full');
    expect(btn).toHaveClass('rounded-lg');
    expect(btn).toHaveClass('text-primary-01');
  });

  it('icon 렌더링', () => {
    const TestIcon = () => <svg data-testid="test-icon" />;
    render(<Button icon={<TestIcon />}>아이콘 버튼</Button>);

    const btn = screen.getByRole('button');
    const icon = screen.getByTestId('test-icon');

    expect(icon).toBeInTheDocument();
    expect(btn).toHaveClass('gap-4');
  });

  it('disabled 시 버튼에 클래스 적용', () => {
    render(<Button disabled>버튼</Button>);

    const btn = screen.getByRole('button');

    expect(btn).toBeDisabled();
    expect(btn).toHaveClass('bg-disable');
    expect(btn).toHaveClass('hover:cursor-not-allowed');
  });

  it('onClick event 정상 작동', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>버튼</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
