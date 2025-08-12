import { useRouter } from 'next/navigation';

import ErrorIcon from '@/assets/icons/error.svg';
import { Button } from '@/components/ui/Button';

interface ErrorFallbackProps {
  title: string;
  subTitle: string;
  navigateLabel: string;
  onRetry?: () => void;
  onNavigate?: () => void;
}

const ErrorFallback = ({
  title,
  subTitle,
  navigateLabel,
  onRetry,
  onNavigate,
}: ErrorFallbackProps) => {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleNaviagte = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex w-220 flex-col items-center justify-center md:w-400">
      <div className="sm:h-100 sm:w-100 md:h-200 md:w-200">
        <ErrorIcon className="error-icon h-full w-full" />
      </div>

      <div className="flex w-full flex-col text-center sm:gap-12 md:gap-16">
        <h1 className="sm:text-body-sb-20 md:text-display-24 text-text-02">{title}</h1>
        <p className="sm:text-body-m-16 md:text-body-m-20 text-text-03">{subTitle}</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-6 sm:mt-40 md:mt-60">
        <Button
          variant="errorPrimary"
          text="errorPrimary"
          size="error"
          onClick={handleRetry}
          disabled={false}
        >
          다시 시도
        </Button>
        <Button
          variant="errorSecondary"
          text="errorSecondary"
          size="error"
          onClick={handleNaviagte}
          disabled={false}
        >
          {navigateLabel}
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
