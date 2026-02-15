/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    experimental: {
        staleTimes: {
            dynamic: 300,
            static: 300
        }
    },
    env: {
        GITHUB_USERNAME: await fetch('https://api.github.com/user',
            {
                headers: {
                    Authorization: `token ${process.env.GH_TOKEN}`,
                },
                next: {
                    tags: ['github', 'github-username'],
                }
            }
        ).then(res => res.json()).then(data => data.login),
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'github.com' },
            { protocol: 'https', hostname: '**.github.com' },
            { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
            { protocol: 'https', hostname: '**.githubusercontent.com' },
        ],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        return config;
    },
};

export default (nextConfig);