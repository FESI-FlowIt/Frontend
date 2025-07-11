import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/, // js, ts, jsx, tsx 파일에서 import 할 때만
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            // 필요시 설정 추가 가능
            // icon: true,           // width/height 무시하고 1em로 설정해서 아이콘처럼 사용
            // prettier: false,
            // svgo: true,
            // titleProp: true,     // <Svg title="..." /> 같은 props 사용 가능
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
