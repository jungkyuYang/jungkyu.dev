// src/widgets/navigation/ui/Navigation.jsx
'use client';

import { Brand } from './Brand';
import { DarkModeToggle } from './DarkModeToggle';
import * as Layout from './NavigationLayouts';
import { NavLinks } from './NavLinks';
import { TryYourself } from './TryYourself';

export const Navigation = () => {
  return (
    <Layout.Root>
      <Layout.LeftSide>
        <Brand />
        {/* 모바일 전용 토글 영역 */}
        <Layout.ActionArea isMobileOnly>
          <DarkModeToggle />
        </Layout.ActionArea>
      </Layout.LeftSide>

      <Layout.RightSide>
        <TryYourself />
        <Layout.MenuList>
          <NavLinks />
          {/* 데스크탑 전용 토글 영역 */}
          <Layout.ActionArea>
            <DarkModeToggle />
          </Layout.ActionArea>
        </Layout.MenuList>
      </Layout.RightSide>
    </Layout.Root>
  );
};
