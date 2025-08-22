import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'swiperjs.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'img.clerk.com',
//         pathname: '/**'
//       },
//       {
//         protocol: 'https',
//         hostname: 'pub-c9b15f8dc7944f509ba18a1f17cedc31.r2.dev',
//         pathname: '/**',
//       },
//     ],
//   },
};

// export default nextConfig;
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);