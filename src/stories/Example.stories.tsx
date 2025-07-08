import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'Example/Intro',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj;

export const Example: Story = {
  render: () => (
    <div
      style={{
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '0.5rem',
        textAlign: 'center',
      }}
    >
      🎉 Storybook 기본 예시입니다.
      <br />
      컴포넌트 없이 정적인 페이지를 보여줄 수 있어요.
    </div>
  ),
};
