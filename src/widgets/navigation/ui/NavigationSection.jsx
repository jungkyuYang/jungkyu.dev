export const NavigationSection = ({ children, side = 'left' }) => {
  const alignmentClass =
    side === 'left'
      ? 'flex items-center justify-between md:justify-start gap-4'
      : 'flex items-center gap-4 md:gap-6';
  return <div className={alignmentClass}>{children}</div>;
};
