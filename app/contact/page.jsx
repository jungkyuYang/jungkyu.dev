import Link from 'next/link';

import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { GoMail, GoPerson } from 'react-icons/go';

import data from '../../data.json';
import { Card } from '../_components/card';
import { EmailCard } from '../_components/EmailCard';
import { getUser, getSocialAccounts } from '../_services/data';

export const runtime = 'nodejs';

export default async function Contacts(props) {
  const searchParams = await props.searchParams;
  const { customUsername } = searchParams;
  const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;

  const [user, githubSocials] = await Promise.all([getUser(username), getSocialAccounts(username)]);

  const email = user.email || data.email;
  const contacts = [];

  if (email) {
    contacts.push({
      icon: <GoMail size={20} />,
      href: `mailto:${email}`,
      label: 'Email',
      handle: email,
    });
  }

  contacts.push({
    icon: <FaGithub size={20} />,
    href: `https://github.com/${username}`,
    label: 'Github',
    handle: username,
  });

  githubSocials.forEach((s) => {
    const handle = s.url.split('/').filter(Boolean).pop();
    switch (s.provider) {
      case 'linkedin':
        contacts.push({ icon: <FaLinkedin size={20} />, href: s.url, label: s.provider, handle });
        break;
      case 'twitter':
        contacts.push({ icon: <FaXTwitter size={20} />, href: s.url, label: s.provider, handle });
        break;
      case 'instagram':
        contacts.push({ icon: <FaInstagram size={20} />, href: s.url, label: s.provider, handle });
        break;
      default:
        contacts.push({
          icon: <GoPerson size={20} />,
          href: s.url,
          label: 'Link',
          handle: 'Profile',
        });
        break;
    }
  });

  return (
    <article className="flex-1 flex flex-col items-center justify-center py-4 animate-fade-in">
      <div className="w-full h-full flex items-center">
        <section className="grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-stretch">
          {contacts.map((s) => {
            const isEmail = s.label === 'Email';

            if (isEmail) {
              return (
                <EmailCard
                  key={s.label}
                  email={s.handle}
                  icon={s.icon}
                  emailParts={s.handle.split('@')}
                  emailTransform="sm:rotate-45 md:rotate-0 lg:rotate-45 xl:rotate-0"
                />
              );
            }

            return (
              <Card key={s.label}>
                <Link
                  href={s.href}
                  target="_blank"
                  className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 py-12 md:py-20 lg:py-24"
                >
                  <span
                    className="absolute w-px h-2/3 bg-linear-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                    {s.icon}
                  </span>
                  <div className="z-10 flex flex-col items-center">
                    <span className="whitespace-nowrap text-xl font-medium duration-150 lg:text-2xl xl:text-3xl !text-zinc-900 dark:!text-zinc-100 group-hover:!text-white font-display">
                      {s.handle}
                    </span>
                    <span className="mt-4 text-sm text-center duration-1000 !text-zinc-500 dark:!text-zinc-400 group-hover:!text-zinc-200 uppercase tracking-widest">
                      {s.label}
                    </span>
                  </div>
                </Link>
              </Card>
            );
          })}
        </section>
      </div>
    </article>
  );
}
