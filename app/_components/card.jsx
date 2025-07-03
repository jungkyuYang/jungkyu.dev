export const Card = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-[340px] min-w-[320px] max-w-[400px] md:min-w-[320px] md:max-w-[400px] w-full overflow-hidden relative duration-700 border rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600 effect-glow">
      <span className="effect-glow-bar" />
      <div className="flex flex-col justify-between h-full w-full">
        {children}
      </div>
    </div>
  );
};
