import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { MswProvider } from './providers/MswProvider';
import ReactQueryProvider from './providers/ReactQueryProvider';

import '../styles/globals.css';

const pretendard = localFont({
  src: '../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'FlowIt',
  description: '작업 패턴 분석을 통해 개인의 생산성을 극대화하는 서비스입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        <MswProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MswProvider>
      </body>
    </html>
  );
}
