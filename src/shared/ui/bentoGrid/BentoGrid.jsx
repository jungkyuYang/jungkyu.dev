export const BentoGrid = ({ children }) => {
  return (
    <div
      className="
      grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 
      auto-rows-[200px] 
      gap-6 max-w-[1400px] mx-auto p-6 md:p-12
    "
    >
      {children}
    </div>
  );
};
