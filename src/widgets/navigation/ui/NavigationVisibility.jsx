export const MobileOnly = ({ children }) => (
  <div className="flex items-center md:hidden">{children}</div>
);
export const DesktopOnly = ({ children }) => <div className="hidden md:block">{children}</div>;
