/** @type {import('next').NextConfig} */

// 설정을 async 함수로 감싸서 내부에서 await을 안전하게 사용합니다.
const nextConfig = async (phase) => {
  let githubUsername = '';

  try {
    // 1. 필요한 데이터를 여기서 미리 가져옵니다.
    const res = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${process.env.GH_TOKEN}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      githubUsername = data.login;
    }
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error);
  }

  // 2. 최종 설정 객체를 반환합니다.
  return {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    experimental: {
      staleTimes: {
        dynamic: 300,
        static: 300,
      },
    },
    env: {
      GITHUB_USERNAME: githubUsername || 'jungkyuYang', // 에러 대비 기본값
    },
    images: {
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      remotePatterns: [
        { protocol: 'https', hostname: 'github.com' },
        { protocol: 'https', hostname: '**.github.com' },
        { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
        { protocol: 'https', hostname: '**.githubusercontent.com' },
        {
          protocol: 'https',
          hostname: 'cdn.simpleicons.org',
        },
      ],
    },
    webpack: (config) => {
      config.resolve.alias.canvas = false;
      return config;
    },
  };
};

export default nextConfig;
