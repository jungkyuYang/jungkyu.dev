// src/widgets/profile/ui/Profile.jsx
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileSummary } from './ProfileSummary';

export const Profile = ({ username, user }) => {
  return (
    <div className="flex w-full flex-col items-center">
      {/* 상단 장식 라인: 디자인적 요소이므로 aria-hidden 추가 */}
      <div
        aria-hidden="true"
        className="animate-glow animate-fade-left hidden h-px w-full bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block"
      />

      {/* 2. 타이틀 영역: 이름과 아바타를 포함 */}
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

      {/* 3. 요약/Bio 영역: 단순 div보다 어울리는 태그 고민 */}
      <div className="animate-fade-in my-16 px-4 text-center">
        {/* ProfileSummary 내부에서 p 태그 등을 사용하고 있을 것이므로 그대로 둡니다. */}
        <ProfileSummary name={user?.name} bio={user?.bio} />
      </div>
    </div>
  );
};
