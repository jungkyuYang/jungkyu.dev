export const Root = ({ children }) => (
  <nav className="animate-fade-in w-full">
    <div className="flex w-full flex-col justify-between gap-6 md:flex-row md:items-center md:gap-0">
      {children}
    </div>
  </nav>
);

export const LeftSide = ({ children }) => (
  <div className="flex items-center justify-between gap-4 md:justify-start">{children}</div>
);

export const RightSide = ({ children }) => (
  <ul className="flex items-center justify-center gap-4 md:justify-end md:gap-8">{children}</ul>
);

export const MenuWrapper = ({ children }) => (
  <div className="flex items-center gap-4 md:gap-6">{children}</div>
);

export const ShowOnMobile = ({ children }) => <div className="md:hidden">{children}</div>;
export const ShowOnDesktop = ({ children }) => <li className="hidden md:block">{children}</li>;
