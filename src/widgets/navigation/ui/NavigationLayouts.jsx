export const NavigationRoot = ({ children }) => (
  <nav className="animate-fade-in w-full">
    {/* 모바일은 세로, 데스크탑은 가로 / 아이템 간격 최적화 */}
    <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
      {children}
    </div>
  </nav>
);

export const NavigationLeftSide = ({ children }) => (
  // 모바일에서 Brand와 MobileToggle이 양옆으로 찢어지게 설정
  <div className="flex items-center justify-between gap-4 md:justify-start">{children}</div>
);

export const NavigationRightSide = ({ children }) => (
  // ul 대신 div로 변경 (내부에 링크와 메뉴 그룹이 섞이므로)
  <div className="flex items-center justify-between gap-4 md:justify-end md:gap-8">{children}</div>
);

export const NavigationMenuList = ({ children }) => (
  // 실제 메뉴 링크들만 ul/li 구조를 가짐
  <ul className="flex items-center gap-4 md:gap-6">{children}</ul>
);

// CSS로만 제어하여 DOM 중복 생성을 방지 (선택 사항이지만 가독성 면에서 추천)
export const NavigationActionArea = ({ children, isMobileOnly = false }) => (
  <div className={isMobileOnly ? 'md:hidden' : 'hidden md:block'}>{children}</div>
);
