// src/widgets/profile/ui/Profile.jsx
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileSummary } from './ProfileSummary';

export const Profile = ({ username, user }) => {
  return (
    <>
      {/* 상단 장식 라인 */}
      <div
        aria-hidden="true"
        className="animate-glow animate-fade-left hidden h-px w-full bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block"
      />

      {/* 이름 & 아바타 영역 */}
      <div className="relative flex items-center justify-center py-5 md:py-10">
        <h1 className="text-edge-outline animate-title font-display z-10 flex cursor-default items-center gap-4 text-4xl whitespace-nowrap !text-zinc-900 duration-1000 hover:scale-105 sm:text-6xl md:gap-8 md:text-9xl dark:!text-zinc-100">
          {username}
          <ProfileAvatar src={user?.avatar_url} />
        </h1>
      </div>

      {/* 하단 장식 라인 */}
      <div
        aria-hidden="true"
        className="animate-glow animate-fade-right hidden h-px w-full bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block"
      />

      {/* 요약/Bio 영역: 불필요한 wrapper div를 제거하고 ProfileSummary가 직접 정렬되도록 함 */}
      <div className="animate-fade-in my-[16px] justify-items-center px-4">
        <ProfileSummary name={user?.name} bio={user?.bio} />
      </div>
    </>
  );
};
