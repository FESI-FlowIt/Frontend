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
      goal: 'h-[1146px] w-[343px] md:h-[1146px] md:w-[636px] lg:h-[428px] lg:w-[1504px]',
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

const Card = ({ icon, title, extra, backgroundColor, size, children, className }: CardProps) => {
  return (
    <div className={cn(cardVariants({ backgroundColor, size }), className)}>
      {/* Header */}
      {(icon || title || extra) && (
        <div className="flex flex-col gap-16 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-8">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            {title && <div className="text-text-01 text-body-sb-20">{title}</div>}
          </div>
          {extra && (
            <div className="flex justify-center md:justify-end">
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
