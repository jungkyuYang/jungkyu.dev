'use client';

import { FaGithub, FaInstagram, FaLinkedin, FaCheck } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GoMail, GoPerson } from 'react-icons/go';

import { useCopyToClipboard } from '@/shared/lib/hooks/use-copy-to-clipboard';

const IconMap = {
  mail: <GoMail size={22} />,
  github: <FaGithub size={22} />,
  linkedin: <FaLinkedin size={22} />,
  twitter: <FaXTwitter size={22} />,
  instagram: <FaInstagram size={22} />,
  link: <GoPerson size={22} />,
};

export const Contact = ({ socialLinks = [] }) => {
  const { isCopied, copy } = useCopyToClipboard();

  const handleAction = (e, item) => {
    if (item.name === 'Email') {
      const email = item.link.replace('mailto:', '');
      copy(email);
    }
  };

  return (
    // 부모 BentoCard의 패딩 안을 꽉 채우도록 p-2 제거 및 h-full 유지
    <section className="flex h-full w-full flex-col justify-between px-2 py-1 select-none">
      {/* 1. Header: 텍스트 밀도와 배지 위치 조정 */}
      <header className="flex items-start justify-between px-1 pt-1">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
            Connect
          </h2>
          <p className="text-[14px] font-bold tracking-tight text-zinc-900 transition-all dark:text-zinc-100">
            {isCopied ? 'HELLO :D' : 'Socials'}
          </p>
        </div>

        {/* 상태 배지: 배경 투명도를 낮추어 BentoCard와 어우러지게 조정 */}
        <div
          className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 backdrop-blur-md transition-all duration-500 ${isCopied ? 'border-blue-500/20 bg-blue-500/10' : 'border-zinc-200/50 bg-zinc-400/5 dark:border-white/10 dark:bg-white/5'}`}
          aria-live="polite"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isCopied ? 'bg-blue-400' : 'animate-ping bg-emerald-400'}`}
            ></span>
            <span
              className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isCopied ? 'bg-blue-500' : 'bg-emerald-500'}`}
            ></span>
          </span>
          <span
            className={`text-[9px] font-black tracking-tight uppercase ${isCopied ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-400'}`}
          >
            {isCopied ? 'Copy!' : 'Online'}
          </span>
        </div>
      </header>

      {/* 2. Action Buttons: 버튼 디자인을 더 컴팩트하게 수정 */}
      <nav className="mt-auto">
        <ul className="mb-1 grid grid-cols-3 gap-2.5" role="list">
          {socialLinks.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                target={item.name === 'Email' ? undefined : '_blank'}
                onClick={(e) => handleAction(e, item)}
                rel="noopener noreferrer"
                className={`relative flex aspect-square items-center justify-center rounded-[1.2rem] border border-zinc-200/50 bg-zinc-50 text-zinc-500 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5 hover:shadow-lg hover:shadow-zinc-900/5 dark:border-white/5 dark:bg-zinc-900/50 dark:text-zinc-400 ${item.color ? `${item.color} hover:border-transparent hover:text-white` : 'hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900'} active:scale-90`}
                aria-label={item.name === 'Email' ? `Copy email` : `Visit ${item.name}`}
              >
                <span className="relative z-10 transition-all duration-300">
                  {isCopied && item.name === 'Email' ? (
                    <FaCheck size={16} className="animate-in zoom-in text-white duration-300" />
                  ) : (
                    IconMap[item.iconType] || IconMap.link
                  )}
                </span>
                <span className="sr-only">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export const ContactSkeleton = () => {
  return (
    <section className="flex h-full w-full animate-pulse flex-col justify-between px-2 py-1">
      {/* Header Skeleton */}
      <header className="flex items-start justify-between px-1 pt-1">
        <div className="flex flex-col gap-1.5">
          <div className="h-2 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </header>

      {/* Buttons Skeleton */}
      <nav className="mt-auto">
        <ul className="mb-1 grid grid-cols-3 gap-2.5">
          {[1, 2, 3].map((i) => (
            <li key={i}>
              <div className="aspect-square rounded-[1.2rem] border border-zinc-200/20 bg-zinc-100 dark:border-white/5 dark:bg-zinc-900/50" />
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};
