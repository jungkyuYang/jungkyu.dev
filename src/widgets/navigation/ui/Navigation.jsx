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
        <Brand /> {/* 내부에서 useNavContext() 사용 */}
        <Layout.ShowOnMobile>
          <DarkModeToggle />
        </Layout.ShowOnMobile>
      </Layout.LeftSide>

      <Layout.RightSide>
        <TryYourself /> {/* 내부에서 useNavContext() 사용 */}
        <Layout.MenuWrapper>
          <NavLinks /> {/* 내부에서 useNavContext() 사용 */}
          <Layout.ShowOnDesktop>
            <DarkModeToggle />
          </Layout.ShowOnDesktop>
        </Layout.MenuWrapper>
      </Layout.RightSide>
    </Layout.Root>
  );
};
