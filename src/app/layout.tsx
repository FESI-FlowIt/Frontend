import type { Metadata } from 'next';

import ReactQueryProvider from './providers/ReactQueryProvider';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'FlowIt',
  description: '작업 패턴 분석을 통해 개인의 생산성을 극대화하는 서비스입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
