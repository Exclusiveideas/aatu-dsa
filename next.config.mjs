/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    // Add a rule for handling GLSL files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/, // Match GLSL file extensions
      use: ['raw-loader', 'glslify-loader'], // Use raw-loader and glslify-loader
    });

    return config; // Return the modified config
  },
};

export default nextConfig;
