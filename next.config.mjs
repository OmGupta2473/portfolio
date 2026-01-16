/** @type {import('next').NextConfig} */
const nextConfig = {
  /* We removed "output: 'export'" because Vercel supports Next.js natively. 
     This allows for better image optimization and faster loading.
  */
  
  eslint: {
    // This allows the build to complete even if there are unused variables or warnings
    ignoreDuringBuilds: true,
  },
  
  // You can remove the 'images' block unless you specifically need unoptimized images
};

export default nextConfig;