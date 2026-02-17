export const transformGitHubStats = (events, repos) => {
  if (!events || !repos) return null;

  // 1. 최근 90일간의 종합 활동량
  const contributions = events.length;

  // 2. 전체 프로젝트에서 받은 Star 총합 계산
  const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

  // 3. 언어 데이터 집계 및 퍼센트 계산
  const langMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + 1;
    }
  });

  const total = Object.values(langMap).reduce((a, b) => a + b, 0) || 1;
  const langColors = {
    TypeScript: '#3178C6',
    JavaScript: '#F7DF1E',
    React: '#61DAFB',
    Tailwind: '#38BDF8',
    CSS: '#1572B6',
    HTML: '#E34F26',
    default: '#A1A1AA',
  };

  const languages = Object.entries(langMap)
    .map(([name, count]) => {
      const percent = Math.round((count / total) * 100);
      return {
        name: `${name} `, // 범례에 퍼센트 포함
        percent,
        color: langColors[name] || langColors.default,
      };
    })
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);

  return {
    metrics: [
      {
        label: 'Contributions',
        value: contributions,
        color: 'text-[#0071E3] dark:text-[#0A84FF]',
      },
      {
        label: 'Stars',
        value: totalStars,
      },
    ],
    chart: {
      data: languages,
      label: 'Skill Rate', // Skill Mix에서 변경
    },
  };
};

export const transformSocialLinks = (username, user, githubSocials, fallbackData) => {
  const email = user.email || fallbackData.email;
  const contacts = [];

  // 1. Email 기본 추가
  if (email) {
    contacts.push({
      name: 'Email',
      iconType: 'mail',
      link: `mailto:${email}`,
      color: 'hover:bg-[#EA4335]',
    });
  }

  // 2. GitHub 기본 추가
  contacts.push({
    name: 'Github',
    iconType: 'github',
    link: `https://github.com/${username}`,
    color: 'hover:bg-[#24292F]',
  });

  // 3. GitHub 소셜 계정 데이터 매핑
  if (Array.isArray(githubSocials)) {
    githubSocials.forEach((s) => {
      const provider = s.provider.toLowerCase();
      const config = {
        linkedin: { icon: 'linkedin', color: 'hover:bg-[#0077B5]' },
        twitter: { icon: 'twitter', color: 'hover:bg-[#000000]' },
        instagram: { icon: 'instagram', color: 'hover:bg-[#E4405F]' },
      };

      const target = config[provider] || { icon: 'link', color: 'hover:bg-zinc-500' };

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
