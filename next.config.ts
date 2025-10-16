import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Предупреждение: Это позволяет успешно завершать production-сборки,
    // даже если в вашем проекте есть ошибки ESLint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
