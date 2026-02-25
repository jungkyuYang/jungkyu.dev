// src/pages/home/ui/HomeView.jsx
import { BentoSection } from '@/widgets/bentoGrid/ui/BentoSection';
import { Profile } from '@/widgets/profile/ui/Profile';
import { ProfileActivity } from '@/widgets/profile-activity/ui/ProfileActivity';

export const HomeView = ({ data }) => {
  return (
    <article className="animate-fade-in flex w-full flex-1 flex-col items-center gap-2">
      <header className="w-full">
        <Profile {...data.Profile} />
      </header>

      <section className="w-full">
        <ProfileActivity {...data.ProfileActivity} />
      </section>

      <section className="w-full">
        <BentoSection {...data.BentoSection} />
      </section>
    </article>
  );
};
