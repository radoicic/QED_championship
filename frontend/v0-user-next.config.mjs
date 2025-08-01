/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent Next.js from failing when 'document is not defined' error occurs during build
  reactStrictMode: true,
  
  // External packages that should be server rendered
  serverExternalPackages: [],
  
  // Configure webpack to provide shims for browser globals
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Provide empty objects for browser APIs in server environment
      config.resolve.fallback = {
        ...config.resolve.fallback,
        localStorage: false, 
        document: false,
        window: false,
        navigator: false
      };
    }
    return config;
  },
  
  images: {
    domains: ['example.com'],
  },
  
  // This is the key configuration to fix the document/window errors
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
}

export default nextConfig 