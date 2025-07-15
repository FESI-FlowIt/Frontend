import Image from 'next/image';

import logo from '../../../public/assets/images/logoIcon.svg';

interface LogoProps {
  children?: React.ReactNode;
  className?: string;
  imgWidth?: number;
  imgHeight?: number;
}

export default function Logo({
  children,
  imgWidth = 60,
  imgHeight = 60,
  className = 'text-52 font-bold text-[#1E2128]',
}: LogoProps) {
  return (
    <div className="lg:py-9.62 md:py-9.62 sm:px-4.8 sm:py-5.77 flex items-center justify-center gap-10 sm:h-60 sm:h-180 md:h-100 md:w-300 md:px-8 lg:h-100 lg:w-300 lg:px-8">
      <Image src={logo} alt="로고 아이콘" width={imgWidth} height={imgHeight} />
      <span className={className}>{children}</span>
    </div>
  );
}
