import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './input';

const meta = {
  title: 'Components/Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: '입력 필드의 타입을 선택합니다.',
    },
    placeholder: {
      control: 'text',
      description: '입력 필드에 표시될 안내 텍스트입니다.',
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드를 비활성화합니다.',
    },
    value: {
      control: 'text',
      description: '입력 필드의 현재 값입니다 (제어 컴포넌트용).',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * **Default Input**
 *
 * 가장 기본적인 형태의 입력 필드입니다.
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: '이메일을 입력하세요...',
  },
};

/**
 * **Password Input**
 *
 * `type`을 'password'로 설정하여, 입력된 내용이 가려지도록 합니다.
 */
export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호',
  },
};

/**
 * **Disabled Input**
 *
 * `disabled` prop을 true로 설정하여, 입력을 비활성화한 상태입니다.
 */
export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: '입력할 수 없습니다',
    disabled: true,
  },
};
