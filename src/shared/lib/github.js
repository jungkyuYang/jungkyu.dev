export const GITHUB_LANG_COLORS = {
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  React: '#61DAFB',
  Tailwind: '#38BDF8',
  CSS: '#1572B6',
  HTML: '#E34F26',
  default: '#A1A1AA',
};

const SOCIAL_CONFIG = {
  email: { icon: 'mail', color: 'hover:bg-[#EA4335]', label: 'Email' },
  github: { icon: 'github', color: 'hover:bg-[#24292F]', label: 'Github' },
  linkedin: { icon: 'linkedin', color: 'hover:bg-[#0077B5]' },
  twitter: { icon: 'twitter', color: 'hover:bg-[#000000]' },
  instagram: { icon: 'instagram', color: 'hover:bg-[#E4405F]' },
  fallback: { icon: 'link', color: 'hover:bg-zinc-500' },
};

/**
 * GitHub 활동 및 언어 통계 데이터 변환
 */
export const transformGitHubStats = (events, repos) => {
  if (!events || !repos) return null;

  const contributions = events.length;
  const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

  const langMap = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const total = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;

  const languages = Object.entries(langMap)
    .map(([name, count]) => ({
      name,
      percent: Math.round((count / total) * 100),
      color: GITHUB_LANG_COLORS[name] || GITHUB_LANG_COLORS.default,
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);

  return {
    metrics: [
      { label: 'Contributions', value: contributions, color: 'text-[#0071E3] dark:text-[#0A84FF]' },
      { label: 'Stars', value: totalStars },
    ],
    chart: {
      data: languages,
      label: 'Skill Rate',
    },
  };
};

/**
 * 유저 소셜 링크 데이터 변환
 */
export const transformSocialLinks = (username, user, githubSocials, fallbackData) => {
  const contacts = [];
  const email = user.email || fallbackData.email;

  // Email
  if (email) {
    contacts.push({ ...SOCIAL_CONFIG.email, link: `mailto:${email}` });
  }

  // GitHub (본인 계정)
  contacts.push({ ...SOCIAL_CONFIG.github, link: `https://github.com/${username}` });

  // GitHub Socials (기타 연결된 계정)
  if (Array.isArray(githubSocials)) {
    githubSocials.forEach((s) => {
      const provider = s.provider.toLowerCase();
      const target = SOCIAL_CONFIG[provider] || SOCIAL_CONFIG.fallback;

      contacts.push({
        name: s.provider,
        iconType: target.icon,
        link: s.url,
        color: target.color,
      });
    });
  }

  return contacts;
};
