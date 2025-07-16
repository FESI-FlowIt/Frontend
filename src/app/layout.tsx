import '../styles/globals.css';
import type { Metadata } from 'next';
import { MSWProvider } from './providers/MSWProvider';
import ReactQueryProvider from './providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'FlowIt',
  description: '작업 패턴 분석을 통해 개인의 생산성을 극대화하는 서비스입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <MSWProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
