/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' to enable API routes on Vercel
  // API routes require server-side rendering
  
  // Image optimization
  images: {
    unoptimized: true,
  },
  
  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
  
  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
//   // Headers for security and performance
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-Frame-Options',
//             value: 'DENY',
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'origin-when-cross-origin',
//           },
//           {
//             key: 'Cache-Control',
//             value: 'public, max-age=31536000, immutable',
//           },
//         ],
//       },
//     ];
//   },
};

module.exports = nextConfig;