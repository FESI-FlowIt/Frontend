import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import FormField from '@/components/ui/FormField';

const meta: Meta<typeof FormField> = {
  title: 'Components/ui/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '폼 필드 래퍼 컴포넌트입니다. 라벨과 다양한 입력 요소들을 조합하여 사용할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
    htmlFor: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return (
      <FormField {...args} label="할 일 제목" htmlFor="todo-title">
        <input
          id="todo-title"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="할 일을 입력해주세요"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </FormField>
    );
  },
};

export const TextArea: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return (
      <FormField {...args} label="할 일 설명" htmlFor="todo-description">
        <textarea
          id="todo-description"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="할 일에 대한 설명을 입력해주세요"
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </FormField>
    );
  },
};

export const Select: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return (
      <FormField {...args} label="우선순위" htmlFor="priority">
        <select
          id="priority"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">우선순위를 선택해주세요</option>
          <option value="high">높음</option>
          <option value="medium">보통</option>
          <option value="low">낮음</option>
        </select>
      </FormField>
    );
  },
};

export const CustomStyle: Story = {
  render: args => {
    const [value, setValue] = useState('');

    return (
      <FormField
        {...args}
        label="할 일 제목"
        htmlFor="custom-todo"
        className="rounded-lg bg-gray-50 p-4"
      >
        <input
          id="custom-todo"
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="커스텀 스타일이 적용된 필드입니다"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </FormField>
    );
  },
};
