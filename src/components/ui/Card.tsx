import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-20 flex flex-col gap-16 p-20', {
  variants: {
    backgroundColor: {
      white: 'bg-ui-background',
      gray: 'bg-gray-200',
    },
  },
  defaultVariants: {
    backgroundColor: 'white',
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  icon,
  title,
  extra,
  backgroundColor,
  children,
  className,
}) => {
  return (
    <div className={cn(cardVariants({ backgroundColor }), className)}>
      {/* Header */}
      {(icon || title || extra) && (
        <div className="flex flex-col gap-16 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-8">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            {title && <div className="text-text-01 text-body-sb-20">{title}</div>}
          </div>
          {extra && <div className="flex-shrink-0">{extra}</div>}
        </div>
      )}

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Card;
