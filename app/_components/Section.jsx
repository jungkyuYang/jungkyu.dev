export default function Section({ title, children, showDivider }) {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
        {title}
      </h2>
      {children}
      {showDivider && (
        <div className="my-12 border-t border-zinc-700 opacity-60" />
      )}
    </section>
  );
}
