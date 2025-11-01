import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-20 flex flex-col gap-16 px-14 py-20 md:px-20', {
  variants: {
    backgroundColor: {
      white: 'bg-white',
      gray: 'bg-cardContainer',
    },
    size: {
      auto: 'mx-auto w-fit lg:mx-0',
      heatmap:
        'mx-auto h-625 w-full min-w-343 md:h-600 md:max-w-636 lg:mx-0 lg:h-548 lg:max-w-636 lg:min-w-536',
      calendar: 'mx-auto w-full min-w-343 md:max-w-636 lg:mx-0 lg:h-368 lg:max-w-636 lg:min-w-536',
      schedule:
        'mx-auto h-auto min-h-140 min-w-343 md:max-w-636 lg:mx-0 lg:h-auto lg:max-w-636 lg:min-w-536 lg:flex-1',
      goal: 'mx-auto max-h-1146 w-full min-w-343 md:min-h-428 md:max-w-636 lg:mx-0 lg:h-388 lg:min-h-388 lg:max-w-1296 lg:min-w-1096',
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
            flexWrapExtra
              ? 'flex-col md:flex-row md:items-center md:justify-between'
              : 'flex-row items-center justify-between',
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
