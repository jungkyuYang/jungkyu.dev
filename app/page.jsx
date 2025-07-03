import Link from "next/link";
import Image from "next/image";
import React, { Suspense } from "react";
import data from "../data.json";
import { ProfileOrganizations } from "./_components/orgs";
import { RecentActivity } from "./_components/recent-activity";
import { getUser } from "./_service/data";
import LoadingIndicator from "./_components/loading-indicator";
import DarkModeToggle from "./_components/DarkModeToggle";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const portfolioImages = [
  {
    src: "/images/4yclingHomerun.webp",
    alt: "KTwiz 사이트 개선 프로젝트",
    title: "KTwiz 사이트 개선 프로젝트",
    description: "KBO 구단 홈페이지 UI/UX 개선, 데이터 시각화 등",
    link: "/projects/ktwiz",
  },
  {
    src: "/images/replay.webp",
    alt: "REPLAY 영상 커뮤니티",
    title: "REPLAY 영상 커뮤니티",
    description: "게임 영상 공유, 커뮤니티, 플레이리스트 기능",
    link: "/projects/replay",
  },
];

export default async function Home(props) {
  const searchParams = await props.searchParams;

  return <LandingComponent searchParams={searchParams} />;
}

const UserIcon = async ({ promise }) => {
  const user = await promise;

  return (
    <Image
      alt="👨‍💻"
      width={100}
      height={100}
      src={user.avatar_url || data.avatarUrl}
      className="float-right rounded-full mx-4"
    />
  );
};

const UserText = async ({ promise }) => {
  const user = await promise;

  return (
    <p>
      Hi, my name is {user.name || data.displayName}
      {". "}
      {user.bio}
    </p>
  );
};

const TryYourself = ({ customUsername }) => {
  const href = customUsername ? "/" : "/search";

  return (
    <Link
      href={href}
      className="text-lg duration-500 !text-zinc-900 dark:!text-zinc-100 border-dashed p-2 rounded-sm border-2 border-zinc-500 hover:!text-zinc-700 dark:hover:!text-zinc-300 hover:border-zinc-300"
    >
      {customUsername
        ? "Showing: " + customUsername + ", click to cancel ❌"
        : "Try yourself"}
    </Link>
  );
};

const LandingComponent = async ({ searchParams: { customUsername } }) => {
  const username =
    customUsername || process.env.GITHUB_USERNAME || data.githubUsername;
  const promise = getUser(username);

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-y-auto bg-linear-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={
                item.href +
                (customUsername ? `?customUsername=${customUsername}` : "")
              }
              className="text-lg duration-500 !text-zinc-900 dark:!text-zinc-100 hover:!text-zinc-700 dark:hover:!text-zinc-300"
            >
              <span className="inline-flex items-center">
                {item.name} <LoadingIndicator />
              </span>
            </Link>
          ))}
          <TryYourself customUsername={customUsername} />
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

      <h1 className="flex items-center z-10 text-4xl hover:scale-110 !text-zinc-900 dark:!text-zinc-100 duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap p-5">
        {username}
        <Suspense fallback={<p>Loading...</p>}>
          <UserIcon promise={promise} />
        </Suspense>
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-lg !text-zinc-700 dark:!text-zinc-400">
          <Suspense
            fallback={<div className="w-full h-px min-h-28">Loading...</div>}
          >
            <div className="w-full h-px min-h-28">
              <UserText promise={promise} />
              <ProfileOrganizations username={username} />
              <RecentActivity username={username} />
            </div>
          </Suspense>
        </h2>
      </div>

      {/* 대표 포트폴리오 섹션 */}
      <section className="my-12 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioImages.map((img) => (
          <a
            href={img.link}
            key={img.src}
            className="group block rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
            />
            <div className="p-4 bg-white dark:bg-zinc-900">
              <h3 className="text-xl font-bold !text-zinc-900 dark:!text-zinc-100">
                {img.title}
              </h3>
              <p className="mt-2 !text-zinc-700 dark:!text-zinc-400">
                {img.description}
              </p>
            </div>
          </a>
        ))}
      </section>
    </div>
  );
};
