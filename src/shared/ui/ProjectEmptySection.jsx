export default function ProjectEmptySection({ message = '열심히 준비중입니다.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 !text-zinc-900 dark:!text-zinc-400">
      <span className="mb-2 text-2xl">😊</span>
      <p>{message}</p>
    </div>
  );
}
