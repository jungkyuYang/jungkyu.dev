'use client';

import { Brand } from './Brand';
import { DarkModeToggle } from './DarkModeToggle';
import * as Layout from './NavigationLayouts';
import { NavLinks } from './NavLinks';
import { TryYourself } from './TryYourself';

export const Navigation = () => {
  return (
    <Layout.NavigationRoot>
      <Layout.NavigationLeftSide>
        <Brand />
        <Layout.NavigationActionArea isMobileOnly>
          <DarkModeToggle />
        </Layout.NavigationActionArea>
      </Layout.NavigationLeftSide>

      <Layout.NavigationRightSide>
        <TryYourself />
        <Layout.NavigationMenuList>
          <NavLinks />
          <Layout.NavigationActionArea>
            <DarkModeToggle />
          </Layout.NavigationActionArea>
        </Layout.NavigationMenuList>
      </Layout.NavigationRightSide>
    </Layout.NavigationRoot>
  );
};
