import type { NextConfig } from 'next';

const svgrOptions = {
  svgoConfig: {
    plugins: [
      {
        name: 'convertColors',
        params: {
          currentColor: true,
        },
      },
    ],
  },
};

const nextConfig: NextConfig = {
  images: {
    domains: [process.env.CLOUDFRONT_IMAGE_URL!],
  },
  // TurboPack 설정
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: [{ loader: '@svgr/webpack', options: svgrOptions }],
          as: '*.js',
        },
      },
    },
  },
  // webpack 설정
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
            svgrOptions,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
