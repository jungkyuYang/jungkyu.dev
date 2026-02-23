export const ActivityLog = ({ message }) => {
  if (!message) return null;

  return (
    <div className="mt-2">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        In last 90 days on GitHub I {message} in public repositories.
      </span>
    </div>
  );
};
