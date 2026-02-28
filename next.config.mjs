/** @type {import('next').NextConfig} */
const nextConfig = {
    // Ensures framer-motion (and any other ESM-only packages) are
    // transpiled correctly by Next.js's webpack bundler.
    transpilePackages: ['framer-motion'],
};

export default nextConfig;
