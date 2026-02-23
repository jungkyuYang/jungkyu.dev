import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GoMail, GoPerson } from 'react-icons/go';

export const parseContacts = (username, email, githubSocials) => {
  const contacts = [];

  // 1. Email 처리
  if (email) {
    contacts.push({
      icon: <GoMail size={20} />,
      href: `mailto:${email}`,
      label: 'Email',
      handle: email, // 복사용 원본 데이터
      // UI 출력용: @를 기준으로 쪼개서 배열로 전달
      displayHandle: email.includes('@')
        ? [email.split('@')[0], `@${email.split('@')[1]}`]
        : [email],
    });
  }

  // 2. Github 처리
  contacts.push({
    icon: <FaGithub size={20} />,
    href: `https://github.com/${username}`,
    label: 'Github',
    handle: username,
    displayHandle: [username], // 일관성을 위해 배열로 감쌈
  });

  // 3. 외부 소셜 계정 처리
  githubSocials.forEach((s) => {
    const handle = s.url.split('/').filter(Boolean).pop();
    const iconMap = {
      linkedin: <FaLinkedin size={20} />,
      twitter: <FaXTwitter size={20} />,
      instagram: <FaInstagram size={20} />,
    };

    contacts.push({
      icon: iconMap[s.provider] || <GoPerson size={20} />,
      href: s.url,
      label: s.provider.charAt(0).toUpperCase() + s.provider.slice(1), // 첫글자 대문자화
      handle: handle || 'Profile',
      displayHandle: [handle || 'Profile'],
    });
  });

  return contacts;
};
