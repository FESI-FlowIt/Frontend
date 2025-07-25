import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs';

import ToggleButton from '@/components/ui/ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ui/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: '토글 버튼의 체크 상태',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: '체크 상태가 변경될 때 호출되는 콜백',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '토글 버튼의 크기',
    },
    background: {
      control: 'select',
      options: ['off', 'primary', 'secondary', 'disabled'],
      description: '체크되었을 때의 배경색',
    },
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
      description: '토글 버튼의 변형',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (Interactive)
export const Default: Story = {
  render: args => {
    const [checked, setChecked] = useState(args.checked || false);

    return <ToggleButton {...args} checked={checked} onCheckedChange={setChecked} />;
  },
  args: {
    checked: false,
    disabled: false,
    size: 'lg',
    background: 'primary',
    variant: 'default',
  },
};

// 크기별 스토리
export const Sizes: Story = {
  render: () => {
    const [checkedStates, setCheckedStates] = useState({
      sm: false,
      md: false,
      lg: false,
      xl: false,
    });

    const handleToggle = (size: keyof typeof checkedStates) => {
      setCheckedStates(prev => ({
        ...prev,
        [size]: !prev[size],
      }));
    };

    return (
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Small (sm)</h3>
          <ToggleButton
            size="sm"
            checked={checkedStates.sm}
            onCheckedChange={() => handleToggle('sm')}
            background="primary"
          />
        </div>
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Medium (md)</h3>
          <ToggleButton
            size="md"
            checked={checkedStates.md}
            onCheckedChange={() => handleToggle('md')}
            background="primary"
          />
        </div>
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Large (lg)</h3>
          <ToggleButton
            size="lg"
            checked={checkedStates.lg}
            onCheckedChange={() => handleToggle('lg')}
            background="primary"
          />
        </div>
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Extra Large (xl)</h3>
          <ToggleButton
            size="xl"
            checked={checkedStates.xl}
            onCheckedChange={() => handleToggle('xl')}
            background="primary"
          />
        </div>
      </div>
    );
  },
};

// 배경색별 스토리
export const BackgroundColors: Story = {
  render: () => {
    const [checkedStates, setCheckedStates] = useState({
      primary: true,
      secondary: true,
    });

    const handleToggle = (type: keyof typeof checkedStates) => {
      setCheckedStates(prev => ({
        ...prev,
        [type]: !prev[type],
      }));
    };

    return (
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Primary Background</h3>
          <ToggleButton
            checked={checkedStates.primary}
            onCheckedChange={() => handleToggle('primary')}
            background="primary"
            size="lg"
          />
        </div>
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Secondary Background</h3>
          <ToggleButton
            checked={checkedStates.secondary}
            onCheckedChange={() => handleToggle('secondary')}
            background="secondary"
            size="lg"
          />
        </div>
      </div>
    );
  },
};

// 상태별 스토리
export const States: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Normal State</h3>
          <ToggleButton
            checked={checked}
            onCheckedChange={setChecked}
            background="primary"
            size="lg"
          />
        </div>
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Disabled State (Off)</h3>
          <ToggleButton checked={false} onCheckedChange={() => {}} disabled={true} size="lg" />
        </div>
        <div className="text-center">
          <h3 className="mb-4 text-lg font-semibold">Disabled State (On)</h3>
          <ToggleButton checked={true} onCheckedChange={() => {}} disabled={true} size="lg" />
        </div>
      </div>
    );
  },
};

// Playground (모든 속성을 조정할 수 있는 스토리)
export const Playground: Story = {
  render: args => {
    const [checked, setChecked] = useState(args.checked || false);

    return (
      <div className="p-8">
        <ToggleButton {...args} checked={checked} onCheckedChange={setChecked} />
      </div>
    );
  },
  args: {
    checked: false,
    disabled: false,
    size: 'lg',
    background: 'primary',
    variant: 'default',
  },
};
