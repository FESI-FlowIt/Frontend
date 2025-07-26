import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-20 flex flex-col gap-16 px-14 py-20 md:px-20', {
  variants: {
    backgroundColor: {
      white: 'bg-ui-background',
      gray: 'bg-gray-200',
      cardContainer: 'bg-cardContainer',
    },
    size: {
      auto: 'w-fit',
      heatmap: 'h-625 w-343 md:h-556 md:w-636 lg:w-752',
      calendar: 'h-392 w-343 md:h-412 md:w-636 lg:h-412 lg:w-728',
      goal: 'h-1146 w-343 md:h-1146 md:w-636 lg:h-428 lg:w-1504',
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
  flexWrapExtra?: boolean;
  className?: string;
}

const Card = ({
  icon,
  title,
  extra,
  backgroundColor,
  size,
  children,
  flexWrapExtra = false,
  className,
}: CardProps) => {
  return (
    <div className={cn(cardVariants({ backgroundColor, size }), className)}>
      {/* Header */}
      {(icon || title || extra) && (
        <div
          className={cn(
            'flex gap-16',
            flexWrapExtra ? 'flex-col' : 'flex-row items-center justify-between',
          )}
        >
          <div className="flex items-center gap-8">
            {icon && (
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center md:h-24 md:w-24">
                {icon}
              </div>
            )}
            {title && <div className="text-text-01 text-body-b-16 md:text-body-sb-20">{title}</div>}
          </div>
          {extra && (
            <div
              className={cn(
                flexWrapExtra ? 'flex justify-center' : 'flex justify-center md:justify-end',
              )}
            >
              <div className="flex-shrink-0">{extra}</div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Card;
