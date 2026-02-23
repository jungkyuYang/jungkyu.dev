export const BentoGrid = ({ children }) => {
  return (
    <div className="mx-auto grid max-w-[1400px] auto-rows-[200px] grid-cols-1 gap-6 p-6 md:grid-cols-3 md:p-12 lg:grid-cols-5">
      {children}
    </div>
  );
};
