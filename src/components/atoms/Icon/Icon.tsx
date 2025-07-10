import {
  CheckCircle2,
  Circle,
  EllipsisVertical,
  LucideProps, // lucide-react에서 제공하는 기본 props 타입
  MoreHorizontal,
  Pencil,
  Pin,
  Trash2,
} from 'lucide-react';

// 프로젝트에서 사용할 아이콘의 이름을 타입으로 정의합니다.
// 새로운 아이콘을 사용하고 싶으면 해당하는 아이콘을 https://lucide.dev/icons/에서 찾아 import하고
// 여기에 이름을 추가하기만 하면 됩니다.
export type IconName = 'pin' | 'trash' | 'edit' | 'check' | 'circle' | 'more' | 'more-vertical';

// Icon 컴포넌트의 props 타입을 정의합니다.
// lucide-react의 기본 props를 상속받아 size, color 등을 그대로 사용할 수 있습니다.
interface IconProps extends LucideProps {
  name: IconName;
}

// name prop에 따라 적절한 아이콘을 렌더링하는 컴포넌트
export const Icon = ({ name, ...props }: IconProps) => {
  switch (name) {
    case 'pin':
      return <Pin {...props} />;
    case 'trash':
      return <Trash2 {...props} />;
    case 'edit':
      return <Pencil {...props} />;
    case 'check':
      return <CheckCircle2 {...props} />;
    case 'circle':
      return <Circle {...props} />;
    case 'more':
      return <MoreHorizontal {...props} />;
    case 'more-vertical':
      return <EllipsisVertical {...props} />;
    default:
      return null; // 정의되지 않은 이름일 경우 아무것도 렌더링하지 않음
  }
};
