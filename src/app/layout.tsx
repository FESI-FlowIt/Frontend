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
  metadataBase: new URL('http://3.35.108.14/'),
  title: 'FlowIt',
  description: '작업 패턴 분석을 통해 개인의 생산성을 극대화하는 서비스입니다.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'FlowIt',
    description: 'FlowIt은 작업 패턴 분석을 통해 개인의 생산성을 극대화하는 서비스',
    url: 'http://3.35.108.14/',
    images: [
      {
        url: 'opengraph-image.png',
        alt: '서비스 설명 이미지',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
    siteName: 'FlowIt',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowIt',
    description: 'FlowIt은 작업 패턴 분석을 통해 개인의 생산성을 극대화하는 서비스',
    images: [
      {
        url: 'opengraph-image.png',
        alt: '서비스 설명 이미지',
        width: 1200,
        height: 630,
      },
    ],
  },
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
