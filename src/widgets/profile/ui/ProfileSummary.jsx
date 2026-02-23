export const ProfileSummary = ({ name, bio }) => (
  <div className="max-w-2xl text-lg !text-zinc-700 dark:!text-zinc-400">
    <p>
      Hi, my name is {name}
      {'. '}
      {bio}
    </p>
  </div>
);
