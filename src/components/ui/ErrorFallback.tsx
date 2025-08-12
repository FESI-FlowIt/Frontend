import { useRouter } from 'next/navigation';

import GeneralErrorIcon from '@/assets/icons/error-general.svg';
import NotFoundErrorIcon from '@/assets/icons/error-notfound.svg';
import { Button } from '@/components/ui/Button';

type ErrorType = 'general' | 'notFound';
type ActionType = 'retry' | 'navigate' | 'back';

interface ErrorAction {
  label: string;
  action: ActionType;
}

interface ErrorConfig {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  subTitle: string;
  iconWrapClass: string;
  primary: ErrorAction;
  secondary: ErrorAction;
}

interface ErrorFallbackProps {
  type?: ErrorType;
  title?: string;
  subTitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onRetry?: () => void;
  onNavigate?: () => void;
  navigateHref?: string;
}

const ERROR_CONFIGS: Record<ErrorType, ErrorConfig> = {
  general: {
    Icon: GeneralErrorIcon,
    title: '문제가 발생했어요',
    subTitle: '잠시 후 다시 시도해 주세요',
    iconWrapClass: 'h-100 w-100',
    primary: { label: '다시 시도', action: 'retry' },
    secondary: { label: '홈으로', action: 'navigate' },
  },
  notFound: {
    Icon: NotFoundErrorIcon,
    title: '페이지를 찾을 수 없어요',
    subTitle: '요청하신 페이지가 존재하지 않습니다',
    iconWrapClass: 'h-100 w-150',
    primary: { label: '홈으로', action: 'navigate' },
    secondary: { label: '이전 페이지', action: 'back' },
  },
};

const ErrorFallback = ({
  type = 'general',
  title,
  subTitle,
  primaryLabel,
  secondaryLabel,
  onRetry,
  onNavigate,
  navigateHref = '/dashboard',
}: ErrorFallbackProps) => {
  const router = useRouter();
  const config = ERROR_CONFIGS[type];
  const { Icon } = config;

  // 최종 표시될 텍스트들
  const displayTitle = title ?? config.title;
  const displaySubTitle = subTitle ?? config.subTitle;
  const displayPrimaryLabel = primaryLabel ?? config.primary.label;
  const displaySecondaryLabel = secondaryLabel ?? config.secondary.label;

  // 액션 핸들러들
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      router.push(navigateHref);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const executeAction = (action: ActionType) => {
    switch (action) {
      case 'retry':
        handleRetry();
        break;
      case 'navigate':
        handleNavigate();
        break;
      case 'back':
        handleBack();
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  };

  return (
    <div className="flex w-300 flex-col items-center justify-center">
      {/* Error Icon */}
      <div className={config.iconWrapClass}>
        <Icon
          className={`h-full w-full ${type === 'general' ? 'general-error-icon' : 'notfound-error-icon'}`}
          aria-hidden="true"
        />
      </div>

      {/* Error Messages */}
      <div className="flex w-full flex-col gap-12 text-center">
        <h1 className="text-body-sb-20 text-text-02">{displayTitle}</h1>
        <p className="text-body-m-16 text-text-03">{displaySubTitle}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-40 flex w-full flex-col items-center justify-center gap-6">
        <Button
          variant="errorPrimary"
          text="errorPrimary"
          size="error"
          onClick={() => executeAction(config.primary.action)}
          disabled={false}
        >
          {displayPrimaryLabel}
        </Button>

        <Button
          variant="errorSecondary"
          text="errorSecondary"
          size="error"
          onClick={() => executeAction(config.secondary.action)}
          disabled={false}
        >
          {displaySecondaryLabel}
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;
